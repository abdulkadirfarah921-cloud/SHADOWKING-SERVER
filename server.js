const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'users.json');

app.use(cors());
app.use(express.json());
app.use(express.static('.')); 

function readDB() { if (!fs.existsSync(DB_PATH)) return []; return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')); }
function saveDB(data) { fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2)); }

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

// تسجيل دخول + حفظ IP
app.post('/api/login', (req, res) => {
    let {playerId, password, ip} = req.body;
    let users = readDB();
    let user = users.find(u => u.playerId === playerId && u.password === password);
    if(!user) return res.json({success: false, msg: "❌ ال ID او كلمة السر غلط"});
    if(user.bannedIps && user.bannedIps.includes(ip)) return res.json({success: false, msg: "🚫 IP تبعك محظور"});
    if(user.banned && user.banUntil > Date.now()) return res.json({success: false, msg: `🚫 محظور لحد ${new Date(user.banUntil).toLocaleDateString()}`});
    if(user.banned && user.banUntil < Date.now()){ user.banned = false; user.banUntil = null; }
    user.ip = ip; user.lastLogin = Date.now(); saveDB(users);
    res.json({success: true, msg: "✅ تم الدخول"});
});

// 1- جلب اللاعبين
app.get('/api/players', (req, res) => { res.json(readDB()); });

// 2- حظر ID
app.post('/api/ban', (req, res) => {
    let {playerId, days} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false}); user.banned = true; user.banUntil = Date.now() + (days * 24 * 60 * 60 * 1000);
    saveDB(users); res.json({success: true, msg: `✅ تم حظر ${playerId}`});
});

// 3- حظر IP
app.post('/api/banip', (req, res) => {
    let {playerId} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user || !user.ip) return res.json({success: false, msg: "❌ اللاعب مش اونلاين"});
    if(!user.bannedIps) user.bannedIps = []; if(!user.bannedIps.includes(user.ip)) user.bannedIps.push(user.ip);
    saveDB(users); res.json({success: true, msg: `✅ تم حظر IP: ${user.ip}`});
});

// 4- فك حظر
app.post('/api/unban', (req, res) => {
    let {playerId} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false}); user.banned = false; user.banUntil = null;
    saveDB(users); res.json({success: true, msg: `✅ تم فك الحظر`});
});

// 5- عرض الشات
app.get('/api/chat/:playerId', (req, res) => {
    let users = readDB(); let user = users.find(u => u.playerId === req.params.playerId);
    res.json({success: true, chat: user ? user.chat : []});
});

// 6- طرد لاعب - جديد
app.post('/api/kick', (req, res) => {
    let {playerId} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false}); user.kicked = true; saveDB(users);
    res.json({success: true, msg: `✅ تم طرد ${playerId}`});
});

// 7- اعطاء فلوس - جديد
app.post('/api/givemoney', (req, res) => {
    let {playerId, amount} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false}); if(!user.money) user.money = 0; user.money += parseInt(amount);
    saveDB(users); res.json({success: true, msg: `✅ تم اعطاء ${amount} للاعب ${playerId}`});
});

// 8- ارسال رسالة للاعب - جديد
app.post('/api/sendmsg', (req, res) => {
    let {playerId, msg} = req.body; let users = readDB(); let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false}); if(!user.messages) user.messages = []; user.messages.push(`[Admin]: ${msg}`);
    saveDB(users); res.json({success: true, msg: `✅ تم الارسال`});
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));