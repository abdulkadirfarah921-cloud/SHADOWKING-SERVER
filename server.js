const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'users.json');
const LOG_PATH = path.join(__dirname, 'logs.json');

app.use(cors());
app.use(express.json());
app.use(express.static('.'));
app.set('trust proxy', true);

function readDB() { if (!fs.existsSync(DB_PATH)) return []; return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')); }
function saveDB(data) { fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2)); }
function readLogs() { if (!fs.existsSync(LOG_PATH)) return []; return JSON.parse(fs.readFileSync(LOG_PATH, 'utf-8')); }
function saveLog(action, admin, target, details) {
    let logs = readLogs();
    logs.push({time: new Date().toLocaleString('ar-EG'), action, admin, target, details});
    fs.writeFileSync(LOG_PATH, JSON.stringify(logs, null, 2));
}

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

// 1- تسجيل دخول
app.post('/api/login', (req, res) => {
    let {playerId, password} = req.body;
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if(ip.includes(',')) ip = ip.split(',')[0].trim();
    if(ip === '::1') ip = '127.0.0.1';

    let users = readDB(); let user = users.find(u => u.playerId === playerId && u.password === password);
    if(!user) return res.json({success: false, msg: "❌ ال ID او كلمة السر غلط"});
    if(user.bannedIps && user.bannedIps.includes(ip)) return res.json({success: false, msg: "🚫 IP تبعك محظور"});
    if(user.banned && user.banUntil > Date.now()) return res.json({success: false, msg: `🚫 محظور لحد ${new Date(user.banUntil).toLocaleString('ar-EG')}`});
    if(user.banned && user.banUntil < Date.now()){ user.banned = false; user.banUntil = null; }

    user.ip = ip; user.lastLogin = Date.now(); user.chatMuted = user.chatMuted || false;
    saveDB(users); res.json({success: true, msg: "✅ تم الدخول"});
});

// 2- جلب اللاعبين
app.get('/api/players', (req, res) => { res.json(readDB()); });

// 3- جلب الاحصائيات
app.get('/api/stats', (req, res) => {
    let users = readDB();
    res.json({
        total: users.length,
        online: users.filter(u => Date.now() - u.lastLogin < 300000).length,
        banned: users.filter(u => u.banned).length
    });
});

// 4- حظر ID
app.post('/api/ban', (req, res) => {
    let {playerId, days, admin} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false}); user.banned = true; user.banUntil = Date.now() + (days * 24 * 60 * 60 * 1000);
    saveDB(users); saveLog("حظر ID", admin, playerId, `${days} يوم`);
    res.json({success: true, msg: `✅ تم حظر ${playerId}`});
});

// 5- حظر IP
app.post('/api/banip', (req, res) => {
    let {playerId, admin} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user ||!user.ip) return res.json({success: false, msg: "❌ اللاعب مش اونلاين"});
    if(!user.bannedIps) user.bannedIps = []; if(!user.bannedIps.includes(user.ip)) user.bannedIps.push(user.ip);
    saveDB(users); saveLog("حظر IP", admin, playerId, user.ip);
    res.json({success: true, msg: `✅ تم حظر IP: ${user.ip}`});
});

// 6- فك حظر
app.post('/api/unban', (req, res) => {
    let {playerId, admin} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false}); user.banned = false; user.banUntil = null;
    saveDB(users); saveLog("فك حظر", admin, playerId, "-");
    res.json({success: true, msg: `✅ تم فك الحظر`});
});

// 7- طرد لاعب
app.post('/api/kick', (req, res) => {
    let {playerId, admin} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false}); user.kicked = true;
    saveDB(users); saveLog("طرد", admin, playerId, "-");
    res.json({success: true, msg: `✅ تم طرد ${playerId}`});
});

// 8- اعطاء فلوس
app.post('/api/givemoney', (req, res) => {
    let {playerId, amount, admin} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false}); if(!user.money) user.money = 0; user.money += parseInt(amount);
    saveDB(users); saveLog("اعطاء فلوس", admin, playerId, `${amount}`);
    res.json({success: true, msg: `✅ تم اعطاء ${amount}`});
});

// 9- اعطاء ايتم
app.post('/api/giveitem', (req, res) => {
    let {playerId, item, amount, admin} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false}); if(!user.inventory) user.inventory = [];
    user.inventory.push({item, amount});
    saveDB(users); saveLog("اعطاء ايتم", admin, playerId, `${amount} x ${item}`);
    res.json({success: true, msg: `✅ تم اعطاء ${amount} ${item}`});
});

// 10- بان شات
app.post('/api/mutechat', (req, res) => {
    let {playerId, admin} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false}); user.chatMuted = true;
    saveDB(users); saveLog("بان شات", admin, playerId, "-");
    res.json({success: true, msg: `✅ تم كتم ${playerId}`});
});

// 11- فك بان شات
app.post('/api/unmutechat', (req, res) => {
    let {playerId, admin} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false}); user.chatMuted = false;
    saveDB(users); saveLog("فك بان شات", admin, playerId, "-");
    res.json({success: true, msg: `✅ تم فك الكتم`});
});

// 12- ارسال رسالة
app.post('/api/sendmsg', (req, res) => {
    let {playerId, msg, admin} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false}); if(!user.messages) user.messages = []; user.messages.push(`[Admin]: ${msg}`);
    saveDB(users); res.json({success: true, msg: `✅ تم الارسال`});
});

// 13- عرض الشات
app.get('/api/chat/:playerId', (req, res) => {
    let users = readDB(); let user = users.find(u => u.playerId === req.params.playerId);
    res.json({success: true, chat: user? user.chat : []});
});

// 14- جلب سجل الحظرات
app.get('/api/logs', (req, res) => { res.json(readLogs()); });

// 15- تليبورت لاعب
app.post('/api/teleport', (req, res) => {
    let {playerId, targetId, admin} = req.body;
    let users = readDB();
    let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false});
    if(!user.teleport) user.teleport = {};
    user.teleport.to = targetId;
    saveDB(users);
    saveLog("تليبورت", admin, playerId, `الى ${targetId}`);
    res.json({success: true, msg: `✅ تم سحب ${playerId} الى ${targetId}`});
});

// 16- نسخ احتياطي
app.get('/api/backup', (req, res) => {
    res.download(DB_PATH, 'users_backup.json');
});

// 17- اعلان للكل
app.post('/api/broadcast', (req, res) => {
    let {msg, admin} = req.body;
    let users = readDB();
    users.forEach(u => {
        if(!u.messages) u.messages = [];
        u.messages.push(`[📢 اعلان]: ${msg}`);
    });
    saveDB(users);
    saveLog("اعلان", admin, "الكل", msg);
    res.json({success: true, msg: `✅ تم ارسال الاعلان للكل`});
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));