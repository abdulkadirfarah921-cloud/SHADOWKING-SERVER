<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>Shadow King - لوحة الادمن</title>
<style>
body {background:#0a0a0a; color:#fff; font-family: Arial; padding:20px;}
.login-box {background:#1a1a1a; padding:20px; border-radius:15px; margin:50px auto; border:2px solid gold; max-width:400px; text-align:center;}
.panel {display:none;} /* مخفية بالبداية */
.box {background:#1a1a1a; padding:20px; border-radius:15px; margin:15px auto; border:2px solid red; max-width:800px;}
input, button, select {padding:10px; margin:5px; border-radius:8px; border:none;}
button {background:#ff0000; color:#fff; cursor:pointer; font-weight:bold;}
table {width:100%; border-collapse:collapse; margin-top:10px;}
td, th {border:1px solid #333; padding:8px; text-align:center;}
h3 {text-align:right;}
</style>
</head>
<body>

<!-- 1. شاشة تسجيل الدخول -->
<div class="login-box" id="loginScreen">
<h1>👑 Shadow King</h1>
<p>السيرفر الخاص - للادمن فقط</p>
<input type="email" id="email" value="abdulkadirfarah921@gmail.com" placeholder="ايميل الادمن">
<input type="password" id="pass" placeholder="كلمة السر">
<button onclick="login()">تسجيل دخول</button>
<div id="msg"></div>
</div>

<!-- 2. لوحة الادمن - بتظهر بعد الدخول -->
<div class="panel" id="adminPanel">
<center><h1>👑 لوحة تحكم الادمن</h1></center>

<div class="box">
<h3>اللاعبين المتصلين 👥</h3>
<button onclick="loadPlayers()">تحديث</button>
<table id="onlineTable"><tr><th>الايميل</th><th>اخر دخول</th></tr></table>
</div>

<div class="box">
<h3>الحسابات المبندة 🚫</h3>
<table id="bannedTable"><tr><th>الايميل</th><th>ينتهي البند</th><th>فك الحظر</th></tr></table>
</div>

<div class="box">
<h3>اعطاء بند 🔨</h3>
<input type="text" id="banID" placeholder="ID اللاعب">
<select id="banDays">
  <option value="1">1 يوم</option>
  <option value="7">7 ايام</option>
  <option value="30">30 يوم</option>
  <option value="365">1 سنة</option>
  <option value="3650">10 سنين</option>
</select>
<button onclick="banUser()">حظر</button>
</div>
</div>

<script>
const API = "https://shadowking-server.onrender.com";
const MY_EMAIL = "abdulkadirfarah921@gmail.com";

function showMsg(t,c){document.getElementById('msg').innerHTML=t; document.getElementById('msg').style.color=c;}

async function login(){
  let res = await fetch(API+"/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email.value,password:pass.value})});
  let data=await res.json(); 
  if(data.success){
    document.getElementById('loginScreen').style.display = 'none'; // نخفي تسجيل الدخول
    document.getElementById('adminPanel').style.display = 'block'; // نظهر لوحة الادمن
    loadPlayers();
  } else { showMsg(data.msg,"red"); }
}

async function banUser(){
  let res = await fetch(API+"/api/ban",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({adminEmail:MY_EMAIL,playerId:banID.value,days:parseInt(banDays.value)})});
  let data=await res.json(); alert(data.msg); loadPlayers();
}

async function unbanUser(id){
  let res = await fetch(API+"/api/unban",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({adminEmail:MY_EMAIL,playerId:id})});
  let data=await res.json(); alert(data.msg); loadPlayers();
}

async function loadPlayers(){
  let res = await fetch(API+"/api/players"); let users=await res.json();
  let online="", banned="";
  users.forEach(u=>{
    let last = u.lastLogin? new Date(u.lastLogin).toLocaleString() : "ما دخل";
    if(!u.banned) online+=`<tr><td>${u.email}</td><td>${last}</td></tr>`;
    else banned+=`<tr><td>${u.email}</td><td>${new Date(u.banUntil).toLocaleDateString()}</td><td><button onclick="unbanUser('${u.playerId}')">فك</button></td></tr>`;
  });
  document.getElementById('onlineTable').innerHTML="<tr><th>الايميل</th><th>اخر دخول</th></tr>"+online;
  document.getElementById('bannedTable').innerHTML="<tr><th>الايميل</th><th>ينتهي البند</th><th>فك الحظر</th></tr>"+banned;
}
</script>
</body>
</html>
