<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>👑 لوحة تحكم ShadowKing V54</title>
<style>
*{margin:0;padding:0;box-sizing:border-box} 
body{background:linear-gradient(135deg,#0a0a0a,#1a0033);color:#fff;font-family:'Tahoma';min-height:100vh;padding:15px}
.container{max-width:1300px;margin:0 auto;background:rgba(20,20,20,0.95);border-radius:20px;padding:20px;border:2px solid #00ff88;box-shadow:0 0 30px #00ff88}
h1{text-align:center;color:#00ff88;text-shadow:0 0 10px #00ff88;margin-bottom:15px}
.login-box{text-align:center;padding:30px} 
input,select{padding:10px;margin:5px;border-radius:8px;border:2px solid #00ff88;background:#111;color:#fff;width:200px}
button{padding:10px 20px;margin:4px;border-radius:8px;border:none;background:#00ff88;color:#000;font-weight:bold;cursor:pointer}
button:hover{transform:scale(1.05)} button.red{background:#ff0044;color:#fff} button.yellow{background:#ffaa00} button.blue{background:#0099ff;color:#fff} button.purple{background:#aa00ff}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:15px 0} 
.statCard{background:#222;padding:15px;border-radius:12px;border:1px solid #00ff88;text-align:center}
.statCard h3{color:#00ff88;font-size:12px} .statCard h2{font-size:24px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px} 
.box{background:#1a1a1a;padding:12px;border-radius:10px;border:1px solid #333} 
.box h3{color:#00ff88;margin-bottom:8px;font-size:14px;border-bottom:1px solid #333;padding-bottom:5px}
table{width:100%;border-collapse:collapse;margin-top:10px;font-size:12px} 
th,td{padding:6px;border:1px solid #333;text-align:center} 
th{background:#00ff88;color:#000}
#msg{margin:10px 0;font-weight:bold} 
.logBox{height:200px;overflow-y:auto;background:#000;padding:10px;border-radius:8px;text-align:right}
</style>
</head>
<body>
<div class="container">
<h1>👑 لوحة تحكم ShadowKing V54 - 54 ميزة</h1>

<div id="loginScreen" class="login-box">
<h2>🔐 تسجيل دخول الادمن</h2>
<input id="playerId" placeholder="ID" value="SK_ADMIN_OMEGA_001"><br>
<input type="password" id="pass" placeholder="الباسورد"><br>
<button onclick="login()">دخول</button><div id="msg"></div>
</div>

<div id="adminPanel" style="display:none">
<button onclick="loadAll()">🔄 تحديث الكل</button> <button class="red" onclick="logout()">🚪 خروج</button>
<div class="stats">
<div class="statCard"><h3>اجمالي اللاعبين</h3><h2 id="total">0</h2></div>
<div class="statCard"><h3>اونلاين</h3><h2 id="online">0</h2></div>
<div class="statCard"><h3>محظورين</h3><h2 id="banned">0</h2></div>
<div class="statCard"><h3>VIP</h3><h2 id="vip">0</h2></div>
</div>

<div class="grid">
<!-- 1-13 الاساسية -->
<div class="box"><h3>1. ادارة اللاعبين</h3><input id="search" placeholder="ابحث ID" onkeyup="searchPlayer()"><table id="playersTable"></table></div>
<div class="box"><h3>2. حظر</h3><input id="banId" placeholder="ID"><select id="banDays"><option value="1">يوم</option><option value="7">اسبوع</option><option value="30">شهر</option><option value="999">دائم</option></select><button class="red" onclick="banPlayer()">🔨 حظر</button></div>
<div class="box"><h3>3. طرد</h3><input id="kickId" placeholder="ID"><button class="red" onclick="kick()">👢 طرد</button></div>
<div class="box"><h3>4. اعطاء فلوس</h3><input id="moneyId" placeholder="ID"><input id="moneyAmount" type="number" placeholder="المبلغ"><button onclick="giveMoney()">💰</button></div>
<div class="box"><h3>5. اعطاء ايتم</h3><input id="itemId" placeholder="ID"><input id="itemName" placeholder="الايتم"><input id="itemAmount" type="number" placeholder="الكمية"><button class="purple" onclick="giveItem()">🎁</button></div>
<div class="box"><h3>6. كتم شات</h3><input id="muteId" placeholder="ID"><button onclick="muteChat()">🔇</button><button class="blue" onclick="unmuteChat()">🔊</button></div>
<div class="box"><h3>7. ارسال رسالة</h3><input id="msgId" placeholder="ID"><input id="msgText" placeholder="الرسالة"><button onclick="sendMsg()">📨</button></div>
<div class="box"><h3>8. فك حظر</h3><input id="unbanId" placeholder="ID"><button onclick="unban(unbanId.value)">✅ فك</button></div>
<div class="box"><h3>9. سجل الادمن</h3><button onclick="loadLogs()">📜</button><div id="logBox" class="logBox"></div></div>
<div class="box"><h3>10. تيليبورت</h3><input id="tpId" placeholder="ID"><input id="tpTarget" placeholder="ID الهدف"><button onclick="teleport()">⚡</button></div>
<div class="box"><h3>11. نسخة احتياطي</h3><button class="blue" onclick="backup()">💾 تحميل</button></div>
<div class="box"><h3>12. اعلان</h3><input id="broadcastMsg" placeholder="الاعلان" style="width:60%"><button onclick="broadcast()">📢</button></div>
<div class="box"><h3>13. عرض مخزن</h3><input id="invId" placeholder="ID"><button onclick="loadInv()">🎒</button><div id="invBox" class="logBox"></div></div>

<!-- 14-30 -->
<div class="box"><h3>14. حظر HWID</h3><input id="hwidId" placeholder="ID"><input id="hwidVal" placeholder="HWID"><button class="red" onclick="banHwid()">🚫</button></div>
<div class="box"><h3>15. الشات العام</h3><button class="green" onclick="loadGlobalChat()">🌍</button><div id="globalChatBox" class="logBox"></div></div>
<div class="box"><h3>16. تغيير لفل</h3><input id="levelId" placeholder="ID"><input id="levelVal" type="number"><button onclick="setLevel()">⭐</button></div>
<div class="box"><h3>17. ريستارت</h3><button class="red" onclick="restartServer()">🔄</button></div>
<div class="box"><h3>18. كتم مؤقت</h3><input id="tempMuteId" placeholder="ID"><input id="muteMinutes" type="number"><button onclick="tempMute()">⏰</button></div>
<div class="box"><h3>19. سحب فلوس</h3><input id="takeMoneyId" placeholder="ID"><input id="takeMoneyAmount" type="number"><button onclick="takeMoney()">💸</button></div>
<div class="box"><h3>20. كلمات ممنوعة</h3><input id="newWord" placeholder="الكلمة"><button onclick="addWord()">🚫</button></div>
<div class="box"><h3>21. تتبع لاعب</h3><input id="trackId" placeholder="ID"><button onclick="trackPlayer()">📍</button><div id="trackResult"></div></div>
<div class="box"><h3>22. حظر سكن</h3><input id="banSkinId" placeholder="ID"><input id="banSkinName" placeholder="اسم السكن"><button class="red" onclick="banSkin()">👕</button></div>
<div class="box"><h3>23. اعطاء VIP</h3><input id="vipId" placeholder="ID"><select id="vipDays"><option value="7">7 ايام</option><option value="30">شهر</option><option value="999">دائم</option></select><button class="yellow" onclick="giveVip()">👑</button></div>
<div class="box"><h3>24. ريستارت وهمي</h3><button onclick="fakeRestart()">⚠️</button></div>
<div class="box"><h3>25. حظر من روم</h3><input id="banRoomId" placeholder="ID"><input id="banRoomName" placeholder="اسم الروم"><button class="red" onclick="banRoom()">🏠</button></div>
<div class="box"><h3>26. تجس شات خاص</h3><input id="pmId" placeholder="ID"><button onclick="loadPM()">👁️</button><div id="pmBox" class="logBox"></div></div>
<div class="box"><h3>27. تجميد لاعب</h3><input id="freezeId" placeholder="ID"><button onclick="freezePlayer()">🧊</button></div>
<div class="box"><h3>28. سرقة فلوس</h3><input id="stealId" placeholder="ID"><button class="red" onclick="stealMoney()">💀</button></div>
<div class="box"><h3>29. انتحال شخصية</h3><input id="impersonateId" placeholder="ID"><input id="impersonateMsg" placeholder="الرسالة"><button class="purple" onclick="impersonate()">🎭</button></div>
<div class="box"><h3>30. حذف حساب</h3><input id="deleteId" placeholder="ID"><button class="red" onclick="deleteAccount()">☠️</button></div>

<!-- 31-54 -->
<div class="box"><h3>31. اعطاء ادمن</h3><input id="adminGiveId" placeholder="ID"><button onclick="giveAdmin()">👑</button></div>
<div class="box"><h3>32. سحب ادمن</h3><input id="adminTakeId" placeholder="ID"><button onclick="takeAdmin()">❌</button></div>
<div class="box"><h3>33. نسخ مخزن</h3><input id="copyInvId" placeholder="ID"><button onclick="copyInv()">📋</button></div>
<div class="box"><h3>34. مسح مخزن</h3><input id="clearInvId" placeholder="ID"><button onclick="clearInv()">🗑️</button></div>
<div class="box"><h3>35. سحب لاعب</h3><input id="tphereId" placeholder="ID"><button onclick="tphere()">🧲</button></div>
<div class="box"><h3>36. تغيير اسم</h3><input id="changeNameId" placeholder="ID"><input id="newNameVal" placeholder="الاسم الجديد"><button onclick="changeName()">✏️</button></div>
<div class="box"><h3>37. وضع الصيانة</h3><button id="maintenanceBtn" onclick="maintenance()">🔧 تشغيل</button></div>
<div class="box"><h3>38. اعطاء دم كامل</h3><input id="hpId" placeholder="ID"><button onclick="fullHP()">❤️</button></div>
<div class="box"><h3>39. قتل لاعب</h3><input id="killId" placeholder="ID"><button class="red" onclick="killPlayer()">💀</button></div>
<div class="box"><h3>40. تفعيل لاق</h3><input id="lagId" placeholder="ID"><button onclick="lagPlayer()">🐌</button></div>
<div class="box"><h3>41. تعطيل لاق</h3><input id="unlagId" placeholder="ID"><button onclick="unlagPlayer()">⚡</button></div>
<div class="box"><h3>42. كتم صوت</h3><input id="voiceMuteId" placeholder="ID"><button onclick="muteVoice()">🔇</button></div>
<div class="box"><h3>43. اعطاء درع</h3><input id="armorId" placeholder="ID"><button onclick="giveArmor()">🛡️</button></div>
<div class="box"><h3>44. طرد الكل</h3><button class="red" onclick="kickAll()">👢👢</button></div>
<div class="box"><h3>45. معلومات جهاز</h3><input id="deviceId" placeholder="ID"><button onclick="deviceInfo()">📱</button><div id="deviceInfoBox"></div></div>
<div class="box"><h3>46. هدية للكل</h3><input id="giftItem" placeholder="الايتم"><input id="giftAmount" type="number"><button onclick="giftAll()">🎁</button></div>
<div class="box"><h3>47. تغيير الطقس</h3><select id="weatherSelect"><option>مشمس</option><option>ممطر</option><option>ثلج</option></select><button onclick="changeWeather()">🌦️</button></div>
<div class="box"><h3>48. وضع الشبح</h3><input id="ghostId" placeholder="ID"><button onclick="ghostMode()">👻</button></div>
<div class="box"><h3>49. اعادة تعيين</h3><input id="resetId" placeholder="ID"><button onclick="resetPlayer()">🔄</button></div>
</div>
</div>
</div>

<script>
const API = "";
let adminName = ""; let words = ["منيك","شرموط","كس"];

async function login(){let res=await fetch(API+"/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:playerId.value,password:pass.value})});let data=await res.json();msg.innerHTML=data.msg;if(data.success){adminName=playerId.value;loginScreen.style.display='none';adminPanel.style.display='block';loadAll();}}

async function loadAll(){loadPlayers();loadStats();}
async function loadStats(){let res=await fetch(API+"/api/stats");let data=await res.json();total.innerHTML=data.total;online.innerHTML=data.online;banned.innerHTML=data.banned;vip.innerHTML=data.vip;}
async function loadPlayers(){let res=await fetch(API+"/api/players");let users=await res.json();window.allUsers=users;renderTable(users);}
function renderTable(users){let table="<tr><th>ID</th><th>فلوس</th><th>لفل</th><th>حالة</th><th>VIP</th></tr>";users.forEach(u=>{table+=`<tr><td>${u.playerId}</td><td>${u.money||0}</td><td>${u.level||1}</td><td>${u.banned?"محظور":"نشط"}</td><td>${u.vip?"👑":""}</td></tr>`});playersTable.innerHTML=table;}
function searchPlayer(){let val=search.value.toLowerCase();renderTable(window.allUsers.filter(u=>u.playerId.toLowerCase().includes(val)));}

async function banPlayer(){let res=await fetch(API+"/api/ban",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:banId.value,days:parseInt(banDays.value),admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function kick(){let res=await fetch(API+"/api/kick",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:kickId.value,admin:adminName})});alert((await res.json()).msg);}
async function giveMoney(){let res=await fetch(API+"/api/givemoney",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:moneyId.value,amount:moneyAmount.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function giveItem(){let res=await fetch(API+"/api/giveitem",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:itemId.value,item:itemName.value,amount:itemAmount.value,admin:adminName})});alert((await res.json()).msg);}
async function muteChat(){let res=await fetch(API+"/api/mutechat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:muteId.value,admin:adminName})});alert((await res.json()).msg);}
async function unmuteChat(){let res=await fetch(API+"/api/unmutechat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:muteId.value,admin:adminName})});alert((await res.json()).msg);}
async function sendMsg(){let res=await fetch(API+"/api/sendmsg",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:msgId.value,msg:msgText.value,admin:adminName})});alert((await res.json()).msg);}
async function unban(id){let res=await fetch(API+"/api/unban",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:id,admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function loadLogs(){let res=await fetch(API+"/api/logs");let logs=await res.json();logBox.innerHTML=logs.reverse().map(l=>`[${l.time}] ${l.admin} عمل ${l.action}`).join('<br>');}
async function teleport(){let res=await fetch(API+"/api/teleport",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:tpId.value,targetId:tpTarget.value,admin:adminName})});alert((await res.json()).msg);}
function backup(){window.open(API+"/api/backup");}
async function broadcast(){let res=await fetch(API+"/api/broadcast",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({msg:broadcastMsg.value,admin:adminName})});alert((await res.json()).msg);}
async function loadInv(){let res=await fetch(API+"/api/inventory/"+invId.value);let data=await res.json();invBox.innerHTML=data.inventory.length?data.inventory.map(i=>`${i.amount} x ${i.item}`).join('<br>'):"فاضي";}
async function banHwid(){let res=await fetch(API+"/api/banhwid",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:hwidId.value,hwid:hwidVal.value,admin:adminName})});alert((await res.json()).msg);}
async function loadGlobalChat(){let res=await fetch(API+"/api/globalchat");let data=await res.json();globalChatBox.innerHTML=data.chat.join('<br>');}
async function setLevel(){let res=await fetch(API+"/api/setlevel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:levelId.value,level:levelVal.value,admin:adminName})});alert((await res.json()).msg);}
async function restartServer(){let res=await fetch(API+"/api/restart",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({admin:adminName})});alert((await res.json()).msg);}
async function tempMute(){let res=await fetch(API+"/api/tempmute",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:tempMuteId.value,minutes:parseInt(muteMinutes.value),admin:adminName})});alert((await res.json()).msg);}
async function takeMoney(){let res=await fetch(API+"/api/takemoney",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:takeMoneyId.value,amount:takeMoneyAmount.value,admin:adminName})});alert((await res.json()).msg);}
function addWord(){if(newWord.value && !words.includes(newWord.value)){words.push(newWord.value);alert("✅ تمت");}}
async function trackPlayer(){let res=await fetch(API+"/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:trackId.value,admin:adminName})});let data=await res.json();trackResult.innerHTML=data.msg;}
async function banSkin(){let res=await fetch(API+"/api/banskin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:banSkinId.value,skin:banSkinName.value,admin:adminName})});alert((await res.json()).msg);}
async function giveVip(){let res=await fetch(API+"/api/givevip",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:vipId.value,days:parseInt(vipDays.value),admin:adminName})});alert((await res.json()).msg);}
async function fakeRestart(){let res=await fetch(API+"/api/fakerestart",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({admin:adminName})});alert((await res.json()).msg);}
async function banRoom(){let res=await fetch(API+"/api/banroom",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:banRoomId.value,room:banRoomName.value,admin:adminName})});alert((await res.json()).msg);}
async function loadPM(){let res=await fetch(API+"/api/pmlogs/"+pmId.value);let data=await res.json();pmBox.innerHTML=data.pm.join('<br>');}
async function freezePlayer(){let res=await fetch(API+"/api/freeze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:freezeId.value,admin:adminName})});alert((await res.json()).msg);}
async function stealMoney(){let res=await fetch(API+"/api/stealmoney",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:stealId.value,admin:adminName})});alert((await res.json()).msg);}
async function impersonate(){let res=await fetch(API+"/api/impersonate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:impersonateId.value,msg:impersonateMsg.value,admin:adminName})});alert((await res.json()).msg);}
async function deleteAccount(){let res=await fetch(API+"/api/deleteaccount",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:deleteId.value,admin:adminName})});alert((await res.json()).msg);}
async function giveAdmin(){let res=await fetch(API+"/api/giveadmin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:adminGiveId.value,admin:adminName})});alert((await res.json()).msg);}
async function takeAdmin(){let res=await fetch(API+"/api/takeadmin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:adminTakeId.value,admin:adminName})});alert((await res.json()).msg);}
async function copyInv(){let res=await fetch(API+"/api/copyinv",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:copyInvId.value,admin:adminName})});alert((await res.json()).msg);}
async function clearInv(){let res=await fetch(API+"/api/clearinv",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:clearInvId.value,admin:adminName})});alert((await res.json()).msg);}
async function tphere(){let res=await fetch(API+"/api/tphere",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:tphereId.value,admin:adminName})});alert((await res.json()).msg);}
async function changeName(){let res=await fetch(API+"/api/changename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:changeNameId.value,newName:newNameVal.value,admin:adminName})});alert((await res.json()).msg);}
async function maintenance(){let res=await fetch(API+"/api/maintenance",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({admin:adminName})});alert((await res.json()).msg);}
async function fullHP(){let res=await fetch(API+"/api/fullhp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:hpId.value,admin:adminName})});alert((await res.json()).msg);}
async function killPlayer(){let res=await fetch(API+"/api/kill",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:killId.value,admin:adminName})});alert((await res.json()).msg);}
async function lagPlayer(){let res=await fetch(API+"/api/lag",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:lagId.value,admin:adminName})});alert((await res.json()).msg);}
async function unlagPlayer(){let res=await fetch(API+"/api/unlag",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:unlagId.value,admin:adminName})});alert((await res.json()).msg);}
async function muteVoice(){let res=await fetch(API+"/api/mutevoice",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:voiceMuteId.value,admin:adminName})});alert((await res.json()).msg);}
async function giveArmor(){let res=await fetch(API+"/api/givearmor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:armorId.value,admin:adminName})});alert((await res.json()).msg);}
async function kickAll(){let res=await fetch(API+"/api/kickall",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({admin:adminName})});alert((await res.json()).msg);}
async function deviceInfo(){let res=await fetch(API+"/api/deviceinfo/"+deviceId.value);let data=await res.json();deviceInfoBox.innerHTML=`IP: ${data.info.ip}`;}
async function giftAll(){let res=await fetch(API+"/api/giftall",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({item:giftItem.value,amount:giftAmount.value,admin:adminName})});alert((await res.json()).msg);}
async function changeWeather(){let res=await fetch(API+"/api/weather",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({weather:weatherSelect.value,admin:adminName})});alert((await res.json()).msg);}
async function ghostMode(){let res=await fetch(API+"/api/ghost",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:ghostId.value,admin:adminName})});alert((await res.json()).msg);}
async function resetPlayer(){let res=await fetch(API+"/api/resetplayer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:resetId.value,admin:adminName})});alert((await res.json()).msg);}
function logout(){loginScreen.style.display='block';adminPanel.style.display='none';}
</script></body></html>
