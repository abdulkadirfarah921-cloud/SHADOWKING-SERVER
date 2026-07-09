<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>👑 لوحة تحكم ShadowKing V40</title>
<style>
*{margin:0;padding:0;box-sizing:border-box} 
body{background:linear-gradient(135deg,#0a0a0a,#1a0033);color:#fff;font-family:'Tahoma';min-height:100vh;padding:15px}
.container{max-width:1400px;margin:0 auto;background:rgba(20,20,20,0.95);border-radius:20px;padding:20px;border:2px solid #00ff88;box-shadow:0 0 30px #00ff88}
h1{text-align:center;color:#00ff88;text-shadow:0 0 10px #00ff88;margin-bottom:15px;font-size:24px}
.login-box{text-align:center;padding:40px} 
input,select{padding:10px;margin:5px;border-radius:8px;border:2px solid #00ff88;background:#111;color:#fff;width:200px;outline:none}
button{padding:10px 15px;margin:4px;border-radius:8px;border:none;background:#00ff88;color:#000;font-weight:bold;cursor:pointer;transition:0.2s} 
button:hover{transform:scale(1.05);box-shadow:0 0 10px #00ff88} 
.red{background:#ff0044;color:#fff} .red:hover{box-shadow:0 0 10px #ff0044}
.yellow{background:#ffaa00} .yellow:hover{box-shadow:0 0 10px #ffaa00}
.blue{background:#0099ff;color:#fff} .blue:hover{box-shadow:0 0 10px #0099ff}
.purple{background:#aa00ff} .purple:hover{box-shadow:0 0 10px #aa00ff}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:15px 0} 
.statCard{background:#222;padding:15px;border-radius:12px;border:1px solid #00ff88;text-align:center}
.statCard h3{color:#00ff88;font-size:12px;margin-bottom:5px} 
.statCard h2{font-size:28px;color:#fff}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:12px} 
.box{background:#1a1a1a;padding:12px;border-radius:10px;border:1px solid #333} 
.box h3{color:#00ff88;margin-bottom:8px;font-size:14px;border-bottom:1px solid #333;padding-bottom:5px}
table{width:100%;border-collapse:collapse;margin-top:8px;font-size:11px} 
th,td{padding:5px;border:1px solid #333;text-align:center} 
th{background:#00ff88;color:#000;font-weight:bold}
#msg{margin:10px 0;font-weight:bold;color:#00ff88} 
.logBox{height:160px;overflow-y:auto;background:#000;padding:8px;border-radius:8px;text-align:right;font-size:11px;border:1px solid #333}
</style>
</head>
<body>
<div class="container">
<h1>👑 لوحة تحكم ShadowKing V40</h1>

<div id="loginScreen" class="login-box">
<h2>🔐 تسجيل دخول الادمن</h2>
<input id="playerId" placeholder="ID الادمن" value="SK_ADMIN_OMEGA_001"><br>
<input type="password" id="pass" placeholder="الباسورد"><br>
<button onclick="login()">دخول</button><div id="msg"></div>
</div>

<div id="adminPanel" style="display:none">
<button onclick="loadAll()">🔄 تحديث الكل</button> 
<button class="red" onclick="logout()">🚪 خروج</button>
<div class="stats">
<div class="statCard"><h3>اجمالي اللاعبين</h3><h2 id="total">0</h2></div>
<div class="statCard"><h3>اونلاين</h3><h2 id="online">0</h2></div>
<div class="statCard"><h3>محظورين</h3><h2 id="banned">0</h2></div>
<div class="statCard"><h3>VIP</h3><h2 id="vip">0</h2></div>
</div>

<div class="grid">
<!-- 1-10 -->
<div class="box"><h3>1. ادارة اللاعبين</h3><input id="search" placeholder="ابحث ID" onkeyup="searchPlayer()"><table id="playersTable"></table></div>
<div class="box"><h3>2. حظر لاعب</h3><input id="banId" placeholder="ID"><select id="banDays"><option value="1">يوم</option><option value="7">اسبوع</option><option value="30">شهر</option><option value="999">دائم</option></select><button class="red" onclick="banPlayer()">🔨 حظر</button></div>
<div class="box"><h3>3. طرد لاعب</h3><input id="kickId" placeholder="ID"><button class="red" onclick="kick()">👢 طرد</button></div>
<div class="box"><h3>4. اعطاء فلوس</h3><input id="moneyId" placeholder="ID"><input id="moneyAmount" type="number" placeholder="المبلغ"><button onclick="giveMoney()">💰 اعطاء</button></div>
<div class="box"><h3>5. اعطاء ايتم</h3><input id="itemId" placeholder="ID"><input id="itemName" placeholder="اسم الايتم"><input id="itemAmount" type="number" placeholder="الكمية"><button class="purple" onclick="giveItem()">🎁 اعطاء</button></div>
<div class="box"><h3>6. كتم شات</h3><input id="muteId" placeholder="ID"><button onclick="muteChat()">🔇 كتم</button><button class="blue" onclick="unmuteChat()">🔊 فك</button></div>
<div class="box"><h3>7. ارسال رسالة</h3><input id="msgId" placeholder="ID"><input id="msgText" placeholder="الرسالة"><button onclick="sendMsg()">📨 ارسال</button></div>
<div class="box"><h3>8. فك حظر</h3><input id="unbanId" placeholder="ID"><button onclick="unban(unbanId.value)">✅ فك الحظر</button></div>
<div class="box"><h3>9. سجل الادمن</h3><button onclick="loadLogs()">📜 تحميل</button><div id="logBox" class="logBox"></div></div>
<div class="box"><h3>10. تيليبورت</h3><input id="tpId" placeholder="ID"><input id="tpTarget" placeholder="ID الهدف"><button onclick="teleport()">⚡ نقل</button></div>

<!-- 11-20 -->
<div class="box"><h3>11. نسخة احتياطي</h3><button class="blue" onclick="backup()">💾 تحميل</button></div>
<div class="box"><h3>12. اعلان للكل</h3><input id="broadcastMsg" placeholder="الاعلان" style="width:60%"><button onclick="broadcast()">📢 ارسال</button></div>
<div class="box"><h3>13. عرض مخزن</h3><input id="invId" placeholder="ID"><button onclick="loadInv()">🎒 عرض</button><div id="invBox" class="logBox"></div></div>
<div class="box"><h3>14. حظر HWID</h3><input id="hwidId" placeholder="ID"><input id="hwidVal" placeholder="HWID"><button class="red" onclick="banHwid()">🚫 حظر</button></div>
<div class="box"><h3>15. الشات العام</h3><button class="blue" onclick="loadGlobalChat()">🌍 تحديث</button><div id="globalChatBox" class="logBox"></div></div>
<div class="box"><h3>16. تغيير لفل</h3><input id="levelId" placeholder="ID"><input id="levelVal" type="number" placeholder="اللفل"><button onclick="setLevel()">⭐ تغيير</button></div>
<div class="box"><h3>17. ريستارت السيرفر</h3><button class="red" onclick="restartServer()">🔄 ريستارت</button></div>
<div class="box"><h3>18. كتم مؤقت</h3><input id="tempMuteId" placeholder="ID"><input id="muteMinutes" type="number" placeholder="دقايق"><button onclick="tempMute()">⏰ كتم</button></div>
<div class="box"><h3>19. سحب فلوس</h3><input id="takeMoneyId" placeholder="ID"><input id="takeMoneyAmount" type="number" placeholder="المبلغ"><button onclick="takeMoney()">💸 سحب</button></div>
<div class="box"><h3>20. كلمات ممنوعة</h3><input id="newWord" placeholder="الكلمة"><button onclick="addWord()">🚫 اضافة</button></div>

<!-- 21-30 -->
<div class="box"><h3>21. تتبع لاعب</h3><input id="trackId" placeholder="ID"><button onclick="trackPlayer()">📍 تتبع</button><div id="trackResult"></div></div>
<div class="box"><h3>22. حظر سكن</h3><input id="banSkinId" placeholder="ID"><input id="banSkinName" placeholder="اسم السكن"><button class="red" onclick="banSkin()">👕 حظر</button></div>
<div class="box"><h3>23. اعطاء VIP</h3><input id="vipId" placeholder="ID"><select id="vipDays"><option value="7">7 ايام</option><option value="30">شهر</option><option value="999">دائم</option></select><button class="yellow" onclick="giveVip()">👑 اعطاء</button></div>
<div class="box"><h3>24. ريستارت وهمي</h3><button onclick="fakeRestart()">⚠️ وهمي</button></div>
<div class="box"><h3>25. حظر من روم</h3><input id="banRoomId" placeholder="ID"><input id="banRoomName" placeholder="اسم الروم"><button class="red" onclick="banRoom()">🏠 حظر</button></div>
<div class="box"><h3>26. تجسس شات خاص</h3><input id="pmId" placeholder="ID"><button onclick="loadPM()">👁️ عرض</button><div id="pmBox" class="logBox"></div></div>
<div class="box"><h3>27. تجميد لاعب</h3><input id="freezeId" placeholder="ID"><button onclick="freezePlayer()">🧊 تجميد</button></div>
<div class="box"><h3>28. سرقة فلوس</h3><input id="stealId" placeholder="ID"><button class="red" onclick="stealMoney()">💀 سرقة</button></div>
<div class="box"><h3>29. انتحال شخصية</h3><input id="impersonateId" placeholder="ID"><input id="impersonateMsg" placeholder="الرسالة"><button class="purple" onclick="impersonate()">🎭 انتحال</button></div>
<div class="box"><h3>30. حذف حساب</h3><input id="deleteId" placeholder="ID"><button class="red" onclick="deleteAccount()">☠️ حذف</button></div>

<!-- 31-40 -->
<div class="box"><h3>31. نسخ لاعب</h3><input id="cloneId" placeholder="ID"><button class="blue" onclick="clonePlayer()">📋 نسخ</button></div>
<div class="box"><h3>32. تبديل اسماء</h3><input id="swapId1" placeholder="ID1"><input id="swapId2" placeholder="ID2"><button onclick="swapNames()">🔄 تبديل</button></div>
<div class="box"><h3>33. بوت تلقائي</h3><input id="botMsg" placeholder="الرسالة"><button class="yellow" onclick="startBot()">🤖 تشغيل</button><button class="red" onclick="stopBot()">⏹️ ايقاف</button></div>
<div class="box"><h3>34. لاج السيرفر</h3><input id="lagAmount" type="number" placeholder="ms"><button class="red" onclick="lagServer()">💥 لاج</button></div>
<div class="box"><h3>35. جعل ادمن</h3><input id="makeAdminId" placeholder="ID"><button class="purple" onclick="makeAdmin()">👑 ترقية</button></div>
<div class="box"><h3>36. سحب ادمن</h3><input id="removeAdminId" placeholder="ID"><button onclick="removeAdmin()">⬇️ سحب</button></div>
<div class="box"><h3>37. سبام شات</h3><input id="spamId" placeholder="ID"><input id="spamMsg" placeholder="الرسالة"><button class="red" onclick="spamChat()">🌊 سبام</button></div>
<div class="box"><h3>38. تغيير سكن</h3><input id="skinId" placeholder="ID"><input id="skinName" placeholder="اسم السكن"><button onclick="changeSkin()">👕 تغيير</button></div>
<div class="box"><h3>39. تعطيل التسجيل</h3><button class="red" onclick="disableRegister()">🔒 تعطيل</button></div>
<div class="box"><h3>40. طرد الكل</h3><button class="red" onclick="kickAll()">💣 طرد جماعي</button></div>
</div>
</div>
</div>

<script>
const API = ""; // حط هنا رابط رندر بتاعك: https://shadowking-server.onrender.com
let adminName = ""; 
let words = ["منيك","شرموط","كس"];
let botInterval;

async function login(){
  let res=await fetch(API+"/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:playerId.value,password:pass.value})});
  let data=await res.json();msg.innerHTML=data.msg;
  if(data.success){adminName=playerId.value;loginScreen.style.display='none';adminPanel.style.display='block';loadAll();}
}
function logout(){loginScreen.style.display='block';adminPanel.style.display='none';}
async function loadAll(){loadPlayers();loadStats();}
async function loadStats(){let res=await fetch(API+"/api/stats");let data=await res.json();total.innerHTML=data.total;online.innerHTML=data.online;banned.innerHTML=data.banned;vip.innerHTML=data.vip;}
async function loadPlayers(){let res=await fetch(API+"/api/players");let users=await res.json();window.allUsers=users;renderTable(users);}
function renderTable(users){let table="<tr><th>ID</th><th>فلوس</th><th>لفل</th><th>حالة</th></tr>";users.forEach(u=>{table+=`<tr><td>${u.playerId}</td><td>${u.money||0}</td><td>${u.level||1}</td><td>${u.banned?"محظور":"نشط"}</td></tr>`});playersTable.innerHTML=table;}
function searchPlayer(){let val=search.value.toLowerCase();renderTable(window.allUsers.filter(u=>u.playerId.toLowerCase().includes(val)));}

async function banPlayer(){await fetch(API+"/api/ban",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:banId.value,days:parseInt(banDays.value),admin:adminName})});alert("✅ تم الحظر");loadPlayers();}
async function kick(){await fetch(API+"/api/kick",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:kickId.value,admin:adminName})});alert("✅ تم الطرد");}
async function giveMoney(){await fetch(API+"/api/givemoney",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:moneyId.value,amount:moneyAmount.value,admin:adminName})});alert("✅ تم");loadPlayers();}
async function giveItem(){await fetch(API+"/api/giveitem",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:itemId.value,item:itemName.value,amount:itemAmount.value,admin:adminName})});alert("✅ تم");}
async function muteChat(){await fetch(API+"/api/mutechat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:muteId.value,admin:adminName})});alert("✅ تم الكتم");}
async function unmuteChat(){await fetch(API+"/api/unmutechat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:muteId.value,admin:adminName})});alert("✅ تم فك الكتم");}
async function sendMsg(){await fetch(API+"/api/sendmsg",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:msgId.value,msg:msgText.value,admin:adminName})});alert("✅ تم الارسال");}
async function unban(id){await fetch(API+"/api/unban",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:id,admin:adminName})});alert("✅ تم فك الحظر");loadPlayers();}
async function loadLogs(){let res=await fetch(API+"/api/logs");let logs=await res.json();logBox.innerHTML=logs.reverse().map(l=>`[${l.time}] ${l.admin}: ${l.action}`).join('<br>');}
async function teleport(){await fetch(API+"/api/teleport",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:tpId.value,targetId:tpTarget.value,admin:adminName})});alert("✅ تم النقل");}
function backup(){window.open(API+"/api/backup");}
async function broadcast(){await fetch(API+"/api/broadcast",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({msg:broadcastMsg.value,admin:adminName})});alert("✅ تم الاعلان");}
async function loadInv(){let res=await fetch(API+"/api/inventory/"+invId.value);let data=await res.json();invBox.innerHTML=data.inventory.map(i=>`${i.amount} x ${i.item}`).join('<br>');}
async function banHwid(){await fetch(API+"/api/banhwid",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:hwidId.value,hwid:hwidVal.value,admin:adminName})});alert("✅ تم");}
async function loadGlobalChat(){let res=await fetch(API+"/api/globalchat");let data=await res.json();globalChatBox.innerHTML=data.chat.join('<br>');}
async function setLevel(){await fetch(API+"/api/setlevel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:levelId.value,level:levelVal.value,admin:adminName})});alert("✅ تم");loadPlayers();}
async function restartServer(){await fetch(API+"/api/restart",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({admin:adminName})});alert("✅ تم الريستارت");}
async function tempMute(){await fetch(API+"/api/tempmute",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:tempMuteId.value,minutes:parseInt(muteMinutes.value),admin:adminName})});alert("✅ تم");}
async function takeMoney(){await fetch(API+"/api/takemoney",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:takeMoneyId.value,amount:takeMoneyAmount.value,admin:adminName})});alert("✅ تم");loadPlayers();}
function addWord(){if(newWord.value && !words.includes(newWord.value)){words.push(newWord.value);alert("✅ تمت اضافة الكلمة");}}
async function trackPlayer(){let res=await fetch(API+"/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:trackId.value,admin:adminName})});let data=await res.json();trackResult.innerHTML=data.msg;}
async function banSkin(){await fetch(API+"/api/banskin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:banSkinId.value,skin:banSkinName.value,admin:adminName})});alert("✅ تم");}
async function giveVip(){await fetch(API+"/api/givevip",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:vipId.value,days:parseInt(vipDays.value),admin:adminName})});alert("✅ تم");loadPlayers();}
async function fakeRestart(){await fetch(API+"/api/fakerestart",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({admin:adminName})});alert("✅ تم");}
async function banRoom(){await fetch(API+"/api/banroom",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:banRoomId.value,room:banRoomName.value,admin:adminName})});alert("✅ تم");}
async function loadPM(){let res=await fetch(API+"/api/pmlogs/"+pmId.value);let data=await res.json();pmBox.innerHTML=data.pm.join('<br>');}
async function freezePlayer(){await fetch(API+"/api/freeze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:freezeId.value,admin:adminName})});alert("✅ تم التجميد");}
async function stealMoney(){await fetch(API+"/api/stealmoney",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:stealId.value,admin:adminName})});alert("✅ تمت السرقة");loadPlayers();}
async function impersonate(){await fetch(API+"/api/impersonate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:impersonateId.value,msg:impersonateMsg.value,admin:adminName})});alert("✅ تم");}
async function deleteAccount(){await fetch(API+"/api/deleteaccount",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:deleteId.value,admin:adminName})});alert("✅ تم الحذف");loadPlayers();}

// 31-40
async function clonePlayer(){await fetch(API+"/api/clone",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:cloneId.value,admin:adminName})});alert("✅ تم النسخ");loadPlayers();}
async function swapNames(){await fetch(API+"/api/swapnames",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id1:swapId1.value,id2:swapId2.value,admin:adminName})});alert("✅ تم التبديل");}
function startBot(){botInterval=setInterval(()=>{fetch(API+"/api/broadcast",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({msg:botMsg.value,admin:adminName})})},5000);alert("🤖 البوت اشتغل");}
function stopBot(){clearInterval(botInterval);alert("⏹️ البوت وقف");}
async function lagServer(){await fetch(API+"/api/lag",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ms:lagAmount.value,admin:adminName})});alert("✅ تم اللاج");}
async function makeAdmin(){await fetch(API+"/api/makeadmin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:makeAdminId.value,admin:adminName})});alert("✅ تمت الترقية");}
async function removeAdmin(){await fetch(API+"/api/removeadmin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:removeAdminId.value,admin:adminName})});alert("✅ تم السحب");}
async function spamChat(){for(let i=0;i<10;i++){await fetch(API+"/api/sendmsg",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:spamId.value,msg:spamMsg.value,admin:adminName})});}alert("✅ تم السبام");}
async function changeSkin(){await fetch(API+"/api/changeskin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:skinId.value,skin:skinName.value,admin:adminName})});alert("✅ تم التغيير");}
async function disableRegister(){await fetch(API+"/api/disableregister",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({admin:adminName})});alert("🔒 تم تعطيل التسجيل");}
async function kickAll(){await fetch(API+"/api/kickall",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({admin:adminName})});alert("💣 تم طرد الكل");}
</script></body></html>
