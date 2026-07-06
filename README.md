<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>لوحة تحكم الادمن</title>
<style>
    body{background:#1a1a1a;color:#fff;font-family:'Tahoma';text-align:center;padding:20px}
    input,button,select{padding:10px;margin:5px;border-radius:8px;border:none}
    input{background:#333;color:#fff;width:250px}
    button{background:#00ff88;color:#000;cursor:pointer;font-weight:bold}
    button:hover{background:#00cc6a}
    .container{background:#2a2a2a;padding:20px;border-radius:15px;max-width:800px;margin:auto}
    table{width:100%;margin-top:20px;border-collapse:collapse}
    td,th{border:1px solid #444;padding:8px}
    #msg{margin-top:10px;font-weight:bold}
    .banned{color:red}
</style>
</head>
<body>
<div class="container">
    <h1>👑 لوحة تحكم الادمن</h1>
    
    <div id="loginScreen">
        <h2>تسجيل الدخول</h2>
        <input type="text" id="playerId" value="SK_ADMIN_OMEGA_001" placeholder="ID الادمن"><br>
        <input type="password" id="pass" placeholder="كلمة السر"><br>
        <button onclick="login()">دخول</button>
        <div id="msg"></div>
    </div>

    <div id="adminPanel" style="display:none">
        <h2>ادارة اللاعبين</h2>
        <button onclick="loadPlayers()">🔄 تحديث</button>
        
        <h3>حظر لاعب</h3>
        <input type="text" id="banId" placeholder="ID اللاعب">
        <select id="banDays">
            <option value="1">يوم واحد</option>
            <option value="7">اسبوع</option>
            <option value="30">30 يوم</option>
            <option value="365">سنة</option>
            <option value="3650">10 سنين</option>
        </select>
        <button onclick="banPlayer()">🔨 حظر</button>
        
        <h3>قائمة اللاعبين</h3>
        <table id="playersTable"></table>
    </div>
</div>

<script>
const API = "";

async function login(){
  let res = await fetch(API+"/api/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({playerId:playerId.value,password:pass.value})
  });
  let data = await res.json(); 
  document.getElementById('msg').innerHTML = data.msg;
  if(data.success){
    document.getElementById('msg').style.color="lightgreen";
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    loadPlayers();
  } else { 
    document.getElementById('msg').style.color="red"; 
  }
}

async function loadPlayers(){
  let res = await fetch(API+"/api/players");
  let users = await res.json();
  let table = "<tr><th>ID</th><th>الحالة</th><th>اخر دخول</th><th>فك حظر</th></tr>";
  users.forEach(u=>{
    let status = u.banned ? `<span class='banned'>محظور لحد ${new Date(u.banUntil).toLocaleDateString()}</span>` : "نشط";
    let unbanBtn = u.banned ? `<button onclick="unban('${u.playerId}')">فك</button>` : "-";
    table += `<tr><td>${u.playerId}</td><td>${status}</td><td>${new Date(u.lastLogin).toLocaleString()}</td><td>${unbanBtn}</td></tr>`;
  });
  document.getElementById('playersTable').innerHTML = table;
}

async function banPlayer(){
  let res = await fetch(API+"/api/ban",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({playerId:banId.value,days:parseInt(banDays.value)})
  });
  let data = await res.json();
  alert(data.msg);
  loadPlayers();
}

async function unban(id){
  let res = await fetch(API+"/api/unban",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({playerId:id})
  });
  let data = await res.json();
  alert(data.msg);
  loadPlayers();
}
</script>
</body>
</html>
