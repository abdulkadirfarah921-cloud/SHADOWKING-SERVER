const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// تحميل البيانات
let users = [];
let logs = [];
try{users = JSON.parse(fs.readFileSync('users.json'))}catch(e){users=[{playerId:"SK_ADMIN_OMEGA_001",password:"123456",role:"admin",money:999,level:100,vip:false,banned:false}]}
try{logs = JSON.parse(fs.readFileSync('logs.json'))}catch(e){logs=[]}

function saveUsers(){fs.writeFileSync('users.json', JSON.stringify(users, null, 2))}
function saveLogs(){fs.writeFileSync('logs.json', JSON.stringify(logs, null, 2))}
function addLog(admin, action){logs.push({time: new Date().toLocaleString("ar-EG"), admin, action}); if(logs.length>500) logs.shift(); saveLogs();}

let globalChat = [];
let pmLogs = {};
let registerEnabled = true;

// 1. تسجيل دخول
app.post('/api/login', (req,res)=>{
  let user = users.find(u=>u.playerId==req.body.playerId && u.password==req.body.password);
  if(user && user.role=='admin') res.json({success:true, msg:"✅ تم الدخول"});
  else res.json({success:false, msg:"❌ خطأ في البيانات"});
});

// 2. احصائيات
app.get('/api/stats', (req,res)=>{
  res.json({
    total:users.length, 
    online:1, 
    banned:users.filter(u=>u.banned).length,
    vip:users.filter(u=>u.vip).length
  });
});

// 3. جلب اللاعبين
app.get('/api/players', (req,res)=>res.json(users));

// 4-30 الميزات الاساسية
app.post('/api/ban', (req,res)=>{let u=users.find(x=>x.playerId==req.body.playerId); if(u){u.banned=true; saveUsers(); addLog(req.body.admin, "حظر "+req.body.playerId); res.json({msg:"✅ تم الحظر"})}});
app.post('/api/kick', (req,res)=>{addLog(req.body.admin, "طرد "+req.body.playerId); res.json({msg:"✅ تم الطرد"})});
app.post('/api/givemoney', (req,res)=>{let u=users.find(x=>x.playerId==req.body.playerId); if(u){u.money+=parseInt(req.body.amount); saveUsers(); addLog(req.body.admin, "اعطاء "+req.body.amount+" ل "+req.body.playerId); res.json({msg:"✅ تم"})}});
app.post('/api/giveitem', (req,res)=>{addLog(req.body.admin, "اعطاء ايتم ل "+req.body.playerId); res.json({msg:"✅ تم"})});
app.post('/api/mutechat', (req,res)=>{addLog(req.body.admin, "كتم "+req.body.playerId); res.json({msg:"✅ تم الكتم"})});
app.post('/api/unmutechat', (req,res)=>{addLog(req.body.admin, "فك كتم "+req.body.playerId); res.json({msg:"✅ تم فك الكتم"})});
app.post('/api/sendmsg', (req,res)=>{addLog(req.body.admin, "ارسال رسالة ل "+req.body.playerId); res.json({msg:"✅ تم الارسال"})});
app.post('/api/unban', (req,res)=>{let u=users.find(x=>x.playerId==req.body.playerId); if(u){u.banned=false; saveUsers(); addLog(req.body.admin, "فك حظر "+req.body.playerId); res.json({msg:"✅ تم فك الحظر"})}});
app.get('/api/logs', (req,res)=>res.json(logs));
app.post('/api/teleport', (req,res)=>{addLog(req.body.admin, "تيليبورت "+req.body.playerId); res.json({msg:"✅ تم"})});
app.get('/api/backup', (req,res)=>res.download('users.json'));
app.post('/api/broadcast', (req,res)=>{globalChat.push(`[اعلان] ${req.body.msg}`); addLog(req.body.admin, "اعلان: "+req.body.msg); res.json({msg:"✅ تم"})});
app.get('/api/inventory/:id', (req,res)=>res.json({inventory:[{item:"سكين",amount:1},{item:"درع",amount:1}]}));
app.post('/api/banhwid', (req,res)=>{addLog(req.body.admin, "حظر HWID "+req.body.playerId); res.json({msg:"✅ تم"})});
app.get('/api/globalchat', (req,res)=>res.json({chat:globalChat}));
app.post('/api/setlevel', (req,res)=>{let u=users.find(x=>x.playerId==req.body.playerId); if(u){u.level=parseInt(req.body.level); saveUsers(); addLog(req.body.admin, "تغيير لفل "+req.body.playerId); res.json({msg:"✅ تم"})}});
app.post('/api/restart', (req,res)=>{addLog(req.body.admin, "ريستارت السيرفر"); res.json({msg:"✅ تم الريستارت"})});
app.post('/api/tempmute', (req,res)=>{addLog(req.body.admin, "كتم مؤقت "+req.body.playerId); res.json({msg:"✅ تم"})});
app.post('/api/takemoney', (req,res)=>{let u=users.find(x=>x.playerId==req.body.playerId); if(u){u.money-=parseInt(req.body.amount); saveUsers(); addLog(req.body.admin, "سحب فلوس من "+req.body.playerId); res.json({msg:"✅ تم"})}});
app.post('/api/track', (req,res)=>{res.json({msg:"الموقع: داريجا - تركيا"})});
app.post('/api/banskin', (req,res)=>{addLog(req.body.admin, "حظر سكن "+req.body.skin); res.json({msg:"✅ تم"})});
app.post('/api/givevip', (req,res)=>{let u=users.find(x=>x.playerId==req.body.playerId); if(u){u.vip=true; saveUsers(); addLog(req.body.admin, "اعطاء VIP ل "+req.body.playerId); res.json({msg:"✅ تم"})}});
app.post('/api/fakerestart', (req,res)=>{addLog(req.body.admin, "ريستارت وهمي"); res.json({msg:"✅ تم"})});
app.post('/api/banroom', (req,res)=>{addLog(req.body.admin, "حظر من روم "+req.body.room); res.json({msg:"✅ تم"})});
app.get('/api/pmlogs/:id', (req,res)=>{res.json({pm:pmLogs[req.params.id]||["لا يوجد رسائل"]})});
app.post('/api/freeze', (req,res)=>{addLog(req.body.admin, "تجميد "+req.body.playerId); res.json({msg:"✅ تم التجميد"})});
app.post('/api/stealmoney', (req,res)=>{let u=users.find(x=>x.playerId==req.body.playerId); let admin=users.find(x=>x.playerId==req.body.admin); if(u){admin.money+=u.money; u.money=0; saveUsers(); addLog(req.body.admin, "سرقة "+req.body.playerId); res.json({msg:"✅ تمت السرقة"})}});
app.post('/api/impersonate', (req,res)=>{addLog(req.body.admin, "انتحال: "+req.body.msg); res.json({msg:"✅ تم"})});
app.post('/api/deleteaccount', (req,res)=>{users=users.filter(x=>x.playerId!=req.body.playerId); saveUsers(); addLog(req.body.admin, "حذف "+req.body.playerId); res.json({msg:"✅ تم الحذف"})});

// 31-40 الميزات الجديدة
app.post('/api/clone', (req,res)=>{let u=users.find(x=>x.playerId==req.body.playerId); if(u){let newUser={...u, playerId:u.playerId+"_CLONE"}; users.push(newUser); saveUsers(); addLog(req.body.admin, "نسخ "+req.body.playerId); res.json({msg:"✅ تم النسخ"})}});
app.post('/api/swapnames', (req,res)=>{addLog(req.body.admin, "تبديل اسماء"); res.json({msg:"✅ تم التبديل"})});
app.post('/api/lag', (req,res)=>{addLog(req.body.admin, "لاج السيرفر "+req.body.ms+"ms"); res.json({msg:"✅ تم اللاج"})});
app.post('/api/makeadmin', (req,res)=>{let u=users.find(x=>x.playerId==req.body.playerId); if(u){u.role="admin"; saveUsers(); addLog(req.body.admin, "جعل "+req.body.playerId+" ادمن"); res.json({msg:"✅ تم"})}});
app.post('/api/removeadmin', (req,res)=>{let u=users.find(x=>x.playerId==req.body.playerId); if(u){u.role="player"; saveUsers(); addLog(req.body.admin, "سحب ادمن من "+req.body.playerId); res.json({msg:"✅ تم"})}});
app.post('/api/changeskin', (req,res)=>{addLog(req.body.admin, "تغيير سكن "+req.body.playerId); res.json({msg:"✅ تم"})});
app.post('/api/disableregister', (req,res)=>{registerEnabled=false; addLog(req.body.admin, "تعطيل التسجيل"); res.json({msg:"✅ تم التعطيل"})});
app.post('/api/kickall', (req,res)=>{addLog(req.body.admin, "طرد الكل"); res.json({msg:"✅ تم طرد الكل"})});

app.listen(PORT, ()=>console.log("👑 ShadowKing Server V40 running on "+PORT));