const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const DB_FILE = 'users.json';
const ADMIN_EMAIL = "abdulkadirfarah921@gmail.com";

function readDB(){ if(!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]'); return JSON.parse(fs.readFileSync(DB_FILE)); }
function saveDB(data){ fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); }

app.post('/api/login', (req, res) => {
    let {email, password} = req.body;
    let users = readDB();
    let user = users.find(u => u.email === email && u.password === password);
    if(!user) return res.json({success: false, msg: "❌ الايميل او كلمة السر غلط"});
    if(user.banned && user.banUntil > Date.now()) return res.json({success: false, msg: `🚫 محظور لحد ${new Date(user.banUntil).toLocaleDateString()}`});
    if(user.banned && user.banUntil < Date.now()){ user.banned = false; user.banUntil = null; }
    user.lastLogin = Date.now();
    saveDB(users);
    res.json({success: true, msg: "✅ تم الدخول"});
});

app.post('/api/ban', (req, res) => {
    let {adminEmail, playerId, days} = req.body;
    if(adminEmail !== ADMIN_EMAIL) return res.json({success: false, msg: "❌ انت مش الادمن"});
    let users = readDB();
    let user = users.find(u => u.playerId === playerId);
    if(!user) return res.json({success: false, msg: "❌ ال ID مش موجود"});
    user.banned = true;
    user.banUntil = Date.now() + (days * 24 * 60 * 60 * 1000);
    saveDB(users);
    res.json({success: true, msg: `✅ تم حظر ${playerId} لمدة ${days} يوم`});
});

app.post('/api/unban', (req, res) => {
    let {adminEmail, playerId} = req.body;
    if(adminEmail !== ADMIN_EMAIL) return res.json({success: false, msg: "❌ انت مش الادمن"});
    let users = readDB();
    let user = users.find(u => u.playerId === playerId);
    if(user){ user.banned = false; user.banUntil = null; saveDB(users); }
    res.json({success: true, msg: `✅ تم فك الحظر عن ${playerId}`});
});

app.get('/api/players', (req, res) => { res.json(readDB()); });

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));