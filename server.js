const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const DB_FILE = 'users.json';
const ADMIN_EMAIL = "abdulkadirfarah921@gmail.com"; // انت الادمن الوحيد

function readDB(){
    if(!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');
    return JSON.parse(fs.readFileSync(DB_FILE));
}
function saveDB(data){
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get('/', (req, res) => {
    res.send('👑 SHADOWKING SERVER شغال');
});

// تسجيل - مقفل للكل الا انت
app.post('/api/register', (req, res) => {
    let {email, password} = req.body;
    let users = readDB();
    
    if(email !== ADMIN_EMAIL) {
        return res.json({success: false, msg: "❌ التسجيل مقفل. السيرفر خاص"});
    }
    
    if(users.find(u => u.email === email)) {
        return res.json({success: false, msg: "❌ الحساب موجود"});
    }
    users.push({email, password, banned: false});
    saveDB(users);
    res.json({success: true, msg: "✅ تم انشاء حساب الادمن"});
});

// تسجيل دخول
app.post('/api/login', (req, res) => {
    let {email, password} = req.body;
    let users = readDB();
    let user = users.find(u => u.email === email && u.password === password);
    
    if(!user) return res.json({success: false, msg: "❌ الايميل او كلمة السر غلط"});
    if(user.banned) return res.json({success: false, msg: "🚫 انت محظور من السيرفر"});
    
    res.json({success: true, msg: "✅ اهلا الادمن"});
});

// حظر - انت بس
app.post('/api/ban', (req, res) => {
    let {adminEmail, targetEmail} = req.body;
    
    if(adminEmail !== ADMIN_EMAIL) {
        return res.json({success: false, msg: "❌ انت مش الادمن"});
    }
    
    let users = readDB();
    let user = users.find(u => u.email === targetEmail);
    if(user) {
        user.banned = true;
        saveDB(users);
        return res.json({success: true, msg: `✅ تم حظر ${targetEmail}`});
    }
    res.json({success: false, msg: "❌ الايميل مش موجود"});
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));