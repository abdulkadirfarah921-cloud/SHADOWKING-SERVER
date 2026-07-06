const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const DB_FILE = 'users.json';
const ADMIN_EMAIL = "abdulkadirfarah921@gmail.com";

// نقرا ونكتب
function readDB(){
    if(!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');
    return JSON.parse(fs.readFileSync(DB_FILE));
}
function saveDB(data){
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// تسجيل - بس للادمن
app.post('/api/register', (req, res) => {
    let {email, password} = req.body;
    let users = readDB();
    if(email !== ADMIN_EMAIL) return res.json({success: false, msg: "❌ التسجيل مقفل"});
    if(users.find(u => u.email === email)) return res.json({success: false, msg: "❌ الحساب موجود"});
    users.push({email, password, banned: false, banUntil: null, lastLogin: null});
    saveDB(users);
    res.json({success: true, msg: "✅ تم انشاء حساب الادمن"});
});

// تسجيل دخول
app.post('/api/login', (req, res) => {
    let {email, password} = req.body;
    let users = readDB();
    let user = users.find(u => u.email === email && u.password === password);
    
    if(!user) return res.json({success: false, msg: "❌ الايميل او كلمة السر غلط"});
    if(user.banned && user.banUntil > Date.now()) return res.json({success: false, msg: `🚫 انت محظور لحد ${new Date(user.banUntil).toLocaleDateString()}`});
    if(user.banned && user.banUntil < Date.now()){ user.banned = false; user.banUntil = null; } // فك البند اذا خلص
    
    user.lastLogin = Date.now();
    saveDB(users);
    res.json({success: true, msg: "✅ اهلا الادمن"});
});

// اعطاء بند بمدة
app.post('/api/ban', (req, res) => {
    let {adminEmail, targetEmail, days} = req.body;
    if(adminEmail !== ADMIN_EMAIL) return res.json({success: false, msg: "❌ انت مش الادمن"});
    
    let users = readDB();
    let user = users.find(u => u.email === targetEmail);
    if(!user) return res.json({success: false, msg: "❌ الايميل مش موجود"});
    
    user.banned = true;
    user.banUntil = Date.now() + (days * 24 * 60 * 60 * 1000); // نحول الايام لمللي ثانية
    saveDB(users);
    res.json({success: true, msg: `✅ تم حظر ${targetEmail} لمدة ${days} يوم`});
});

// فك البند
app.post('/api/unban', (req, res) => {
    let {adminEmail, targetEmail} = req.body;
    if(adminEmail !== ADMIN_EMAIL) return res.json({success: false, msg: "❌ انت مش الادمن"});
    
    let users = readDB();
    let user = users.find(u => u.email === targetEmail);
    if(user){ user.banned = false; user.banUntil = null; saveDB(users); }
    res.json({success: true, msg: `✅ تم فك الحظر عن ${targetEmail}`});
});

// جلب كل اللاعبين
app.get('/api/players', (req, res) => {
    let users = readDB();
    res.json(users);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));