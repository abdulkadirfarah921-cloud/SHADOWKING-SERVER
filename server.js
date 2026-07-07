const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'users.json');

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // مهم: النقطة عشان يقرأ من الجذر

// قراءة الداتا
function readDB() {
    if (!fs.existsSync(DB_PATH)) return [];
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

// حفظ الداتا
function saveDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// تسجيل دخول بالـ ID
app.post('/api/login', (req, res) => {
    let {playerId, password} = req.body;
    let users = readDB();
    let user = users.find(u => u.playerId === playerId && u.password === password);
    
    if(!user) return res.json({success: false, msg: "❌ ال ID او كلمة السر غلط"});
    
    if(user.banned && user.banUntil > Date.now()) {
        return res.json({success: false, msg: `🚫 محظور لحد ${new Date(user.banUntil).toLocaleDateString()}`});
    }
    
    if(user.banned && user.banUntil < Date.now()){ 
        user.banned = false; 
        user.banUntil = null; 
        saveDB(users);
    }
    
    user.lastLogin = Date.now();
    saveDB(users);
    res.json({success: true, msg: "✅ تم الدخول"});
});

// جلب اللاعبين
app.get('/api/players', (req, res) => {
    let users = readDB();
    res.json(users);
});

// حظر لاعب
app.post('/api/ban', (req, res) => {
    let {playerId, days} = req.body;
    let users = readDB();
    let user = users.find(u => u.playerId === playerId);
    
    if(!user) return res.json({success: false, msg: "❌ اللاعب غير موجود"});
    
    user.banned = true;
    user.banUntil = Date.now() + (days * 24 * 60 * 60 * 1000);
    saveDB(users);
    res.json({success: true, msg: `✅ تم حظر ${playerId} لمدة ${days} يوم`});
});

// فك حظر
app.post('/api/unban', (req, res) => {
    let {playerId} = req.body;
    let users = readDB();
    let user = users.find(u => u.playerId === playerId);
    
    if(!user) return res.json({success: false, msg: "❌ اللاعب غير موجود"});
    
    user.banned = false;
    user.banUntil = null;
    saveDB(users);
    res.json({success: true, msg: `✅ تم فك الحظر عن ${playerId}`});
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));