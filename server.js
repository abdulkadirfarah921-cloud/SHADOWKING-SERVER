const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// قاعدة بيانات وهمية. بعدين بنحط MySQL
let users = [
    {id: "Abdualkadirfarah921@gmail.com", pass: "1234", banned: false}
];
let banned = [];

// 1. تسجيل الدخول
app.post('/api/login', (req, res) => {
    const {email, password} = req.body;
    let user = users.find(u => u.id === email && u.pass === password);
    
    if(!user) return res.json({success: false, msg: "الايميل او كلمة السر غلط"});
    if(banned.includes(email)) return res.json({success: false, msg: "❌ الحساب محظور"});
    
    res.json({success: true, msg: "✅ تم تسجيل الدخول"});
});

// 2. حظر لاعب - للادمن
app.post('/api/ban', (req, res) => {
    const {email} = req.body;
    if(!banned.includes(email)) banned.push(email);
    res.json({success: true, banned: banned});
});

// 3. فحص الباند - اللعبة رح تستدعيه
app.get('/api/check/:email', (req, res) => {
    let isBanned = banned.includes(req.params.email);
    res.json({banned: isBanned});
});

app.listen(3000, () => console.log("Server شغال على 3000"));