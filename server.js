const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const USERS_FILE = 'users.json';
const LOGS_FILE = 'logs.json';
const CHAT_FILE = 'chat.json';

// تحميل البيانات
let users = [];
let logs = [];
let chat = [];
let registerEnabled = true;

function loadData(){
  if(fs.existsSync(USERS_FILE)) users = JSON.parse(fs.readFileSync(USERS_FILE));
  if(fs.existsSync(LOGS_FILE)) logs = JSON.parse(fs.readFileSync(LOGS_FILE));
  if(fs.existsSync(CHAT_FILE)) chat = JSON.parse(fs.readFileSync(CHAT_FILE));
}
function saveUsers(){ fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2)); }
function saveLogs(){ fs.writeFileSync(LOGS_FILE, JSON.stringify(logs, null, 2)); }
function addLog(admin, action){ logs.push({admin, action, time: new Date().toLocaleString("ar-EG")}); saveLogs(); }
loadData();

// ========== 1. تسجيل الدخول ==========
app.post('/api/login', (req,res)=>{
  const {playerId,password} = req.body;
  const user = users.find(u=>u.playerId===playerId && u.password===password);
  if(user && user.role==="admin") res.json({success:true,msg:"✅ تم الدخول"});
  else res.json({success:false,msg:"❌ خطأ في البيانات"});
});

// ========== 2. احصائيات ==========
app.get('/api/stats', (req,res)=>{
  res.json({
    total: users.length,
    online: users.filter(u=>!u.banned).length,
    banned: users.filter(u=>u.banned).length,
    vip: users.filter(u=>u.vip).length
  });
});

app.get('/api/players', (req,res)=> res.json(users));

// ========== 3-40 الميزات الاساسية ==========
app.post('/api/ban', (req,res)=>{ const {playerId,days,admin} = req.body; let u=users.find(x=>x.playerId===playerId); if(u){u.banned=true; saveUsers(); addLog(admin,`حظر ${playerId} ${days} يوم`);} res.json({success:true}); });
app.post('/api/kick', (req,res)=>{ addLog(req.body.admin,`طرد ${req.body.playerId}`); res.json({success:true}); });
app.post('/api/givemoney', (req,res)=>{ let u=users.find(x=>x.playerId===req.body.playerId); if(u){u.money=(u.money||0)+parseInt(req.body.amount); saveUsers(); addLog(req.body.admin,`اعطاء ${req.body.amount} لـ ${req.body.playerId}`);} res.json({success:true}); });
app.post('/api/giveitem', (req,res)=>{ addLog(req.body.admin,`اعطاء ${req.body.item} لـ ${req.body.playerId}`); res.json({success:true}); });
app.post('/api/mutechat', (req,res)=>{ addLog(req.body.admin,`كتم ${req.body.playerId}`); res.json({success:true}); });
app.post('/api/unmutechat', (req,res)=>{ addLog(req.body.admin,`فك كتم ${req.body.playerId}`); res.json({success:true}); });
app.post('/api/sendmsg', (req,res)=>{ addLog(req.body.admin,`ارسال رسالة لـ ${req.body.playerId}`); res.json({success:true}); });
app.post('/api/unban', (req,res)=>{ let u=users.find(x=>x.playerId===req.body.playerId); if(u){u.banned=false; saveUsers(); addLog(req.body.admin,`فك حظر ${req.body.playerId}`);} res.json({success:true}); });
app.get('/api/logs', (req,res)=> res.json(logs));
app.post('/api/teleport', (req,res)=>{ addLog(req.body.admin,`نقل ${req.body.playerId}`); res.json({success:true}); });
app.get('/api/backup', (req,res)=>{ res.download(USERS_FILE); });
app.post('/api/broadcast', (req,res)=>{ addLog(req.body.admin,`اعلان: ${req.body.msg}`); res.json({success:true}); });
app.get('/api/inventory/:id', (req,res)=> res.json({inventory:[]}));
app.post('/api/banhwid', (req,res)=>{ addLog(req.body.admin,`بان HWID ${req.body.playerId}`); res.json({success:true}); });
app.get('/api/globalchat', (req,res)=> res.json({chat}));
app.post('/api/setlevel', (req,res)=>{ let u=users.find(x=>x.playerId===req.body.playerId); if(u){u.level=parseInt(req.body.level); saveUsers();} res.json({success:true}); });
app.post('/api/restart', (req,res)=>{ addLog(req.body.admin,`ريستارت السيرفر`); res.json({success:true}); });
app.post('/api/tempmute', (req,res)=>{ addLog(req.body.admin,`كتم مؤقت ${req.body.playerId}`); res.json({success:true}); });
app.post('/api/takemoney', (req,res)=>{ let u=users.find(x=>x.playerId===req.body.playerId); if(u){u.money=(u.money||0)-parseInt(req.body.amount); saveUsers();} res.json({success:true}); });
app.post('/api/track', (req,res)=> res.json({msg:`${req.body.playerId} اونلاين`}));
app.post('/api/banskin', (req,res)=>{ addLog(req.body.admin,`حظر سكن ${req.body.skin}`); res.json({success:true}); });
app.post('/api/givevip', (req,res)=>{ let u=users.find(x=>x.playerId===req.body.playerId); if(u){u.vip=true; saveUsers();} res.json({success:true}); });
app.post('/api/fakerestart', (req,res)=>{ addLog(req.body.admin,`ريستارت وهمي`); res.json({success:true}); });
app.post('/api/banroom', (req,res)=>{ addLog(req.body.admin,`حظر من روم ${req.body.room}`); res.json({success:true}); });
app.get('/api/pmlogs/:id', (req,res)=> res.json({pm:[]}));
app.post('/api/freeze', (req,res)=>{ addLog(req.body.admin,`تجميد ${req.body.playerId}`); res.json({success:true}); });
app.post('/api/stealmoney', (req,res)=>{ let u=users.find(x=>x.playerId===req.body.playerId); if(u){u.money=0; saveUsers();} res.json({success:true}); });
app.post('/api/impersonate', (req,res)=>{ addLog(req.body.admin,`انتحال ${req.body.playerId}`); res.json({success:true}); });
app.post('/api/deleteaccount', (req,res)=>{ users=users.filter(x=>x.playerId!==req.body.playerId); saveUsers(); res.json({success:true}); });
app.post('/api/clone', (req,res)=>{ addLog(req.body.admin,`نسخ ${req.body.playerId}`); res.json({success:true}); });
app.post('/api/swapnames', (req,res)=>{ addLog(req.body.admin,`تبديل اسماء`); res.json({success:true}); });
app.post('/api/lag', (req,res)=>{ addLog(req.body.admin,`لاج ${req.body.ms}ms`); res.json({success:true}); });
app.post('/api/makeadmin', (req,res)=>{ let u=users.find(x=>x.playerId===req.body.playerId); if(u){u.role="admin"; saveUsers();} res.json({success:true}); });
app.post('/api/removeadmin', (req,res)=>{ let u=users.find(x=>x.playerId===req.body.playerId); if(u){u.role="player"; saveUsers();} res.json({success:true}); });
app.post('/api/changeskin', (req,res)=>{ addLog(req.body.admin,`تغيير سكن ${req.body.playerId}`); res.json({success:true}); });
app.post('/api/disableregister', (req,res)=>{ registerEnabled=false; addLog(req.body.admin,`تعطيل التسجيل`); res.json({success:true}); });
app.post('/api/kickall', (req,res)=>{ addLog(req.body.admin,`طرد الكل`); res.json({success:true}); });

// ========== 41-50 ميزات V50 الجديدة ==========
app.post('/api/ghost', (req,res)=>{ addLog(req.body.admin,`تفعيل وضع الشبح`); res.json({success:true}); });
app.post('/api/cloneall', (req,res)=>{ addLog(req.body.admin,`نسخ كل اللاعبين`); res.json({success:true}); });
app.post('/api/banip', (req,res)=>{ addLog(req.body.admin,`بان IP ${req.body.playerId}`); res.json({success:true}); });
app.post('/api/fakemsg', (req,res)=>{ addLog(req.body.admin,`رسالة مزيفة من ${req.body.playerId}`); res.json({success:true}); });
app.post('/api/nuke', (req,res)=>{ users=[]; saveUsers(); addLog(req.body.admin,`تفجير السيرفر`); res.json({success:true}); });
app.post('/api/seethrough', (req,res)=>{ addLog(req.body.admin,`تجسس على ${req.body.playerId}`); res.json({success:true}); });
app.post('/api/makebot', (req,res)=>{ addLog(req.body.admin,`تحويل ${req.body.playerId} لبوت`); res.json({success:true}); });
app.get('/api/loginlogs', (req,res)=> res.json({logs:logs.filter(l=>l.action.includes("دخول")).slice(-20)}));
app.post('/api/antihack', (req,res)=>{ addLog(req.body.admin,`تفعيل الحماية`); res.json({success:true}); });
app.get('/api/serverinfo', (req,res)=> res.json({cpu:45,ram:512}));

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`👑 ShadowKing V50 شغال على ${PORT}`));