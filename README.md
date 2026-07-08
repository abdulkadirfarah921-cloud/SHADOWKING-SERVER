<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>لوحة تحكم الادمن</title>
<style>body{background:#0a0a0a;color:#fff;font-family:'Tahoma';text-align:center;padding:20px}
.container{background:#1a1a1a;padding:20px;border-radius:15px;max-width:1100px;margin:auto;box-shadow:0 0 20px #00ff88}
input,button,select{padding:10px;margin:5px;border-radius:8px;border:none}
input{background:#2a2a2a;color:#fff;width:180px} button{background:#00ff88;color:#000;cursor:pointer;font-weight:bold}
button.red{background:#ff4444} button.blue{background:#3399ff} button.orange{background:#ffaa00} button.purple{background:#aa00ff} button.green{background:#00cc66} button.yellow{background:#ffdd00}
table{width:100%;margin-top:20px;border-collapse:collapse;font-size:13px} td,th{border:1px solid #333;padding:8px}
#chatBox,#logBox,#invBox,#globalChatBox,#pmBox{background:#000;padding:10px;overflow-y:scroll;text-align:right;border-radius:8px}
.box{border:1px solid #333;padding:15px;margin:15px 0;border-radius:10px;background:#222}
.stats{display:flex;justify-content:space-around;margin:15px 0;flex-wrap:wrap}
.statBox{background:#2a2a2a;padding:15px;border-radius:10px;width:30%;min-width:120px;margin:5px}
h1{color:#00ff88} h3{color:#00ff88}
.jumpBar{position:sticky;top:0;background:#111;padding:10px;border-radius:10px;margin-bottom:20px;border:2px solid #00ff88}
.vip{color:gold;font-weight:bold} .frozen{color:#00ccff}
</style></head><body>
<div class="container"><h1>👑 لوحة تحكم ShadowKing V30</h1>

<div id="loginScreen"><h2>تسجيل الدخول</h2>
<input id="playerId" value="SK_ADMIN_OMEGA_001"><br><input type="password" id="pass"><br>
<button onclick="login()">دخول</button><div id="msg"></div></div>

<div id="adminPanel" style="display:none">

<div class="jumpBar">
<button class="yellow" onclick="document.getElementById('newFeatures').scrollIntoView()">⚡ اذهب للميزات الجديدة 14-30</button>
</div>

<button onclick="loadPlayers()">🔄 تحديث الكل</button>

<div class="stats">
<div class="statBox"><h4>الاونلاين</h4><h2 id="online">0</h2></div>
<div class="statBox"><h4>الكل</h4><h2 id="total">0</h2></div>
<div class="statBox"><h4>المحظورين</h4><h2 id="banned">0</h2></div>
</div>

<div class="box"><h3>1- ادارة اللاعبين</h3><input id="search" placeholder="ابحث عن ID" onkeyup="searchPlayer()"><table id="playersTable"></table></div>
<div class="box"><h3>2- حظر ID</h3><input id="banId" placeholder="ID اللاعب"><select id="banDays"><option value="1">يوم</option><option value="7">اسبوع</option><option value="30">30 يوم</option><option value="999">دائم</option></select><button class="red" onclick="banPlayer()">🔨 حظر</button></div>
<div class="box"><h3>3- حظر IP</h3><input id="banIpId" placeholder="ID اللاعب"><button class="red" onclick="banIp()">🔥 حظر IP</button></div>
<div class="box"><h3>4- طرد لاعب</h3><input id="kickId" placeholder="ID اللاعب"><button class="orange" onclick="kick()">👢 طرد</button></div>
<div class="box"><h3>5- اعطاء فلوس</h3><input id="moneyId" placeholder="ID اللاعب"><input id="moneyAmount" type="number" placeholder="المبلغ"><button class="blue" onclick="giveMoney()">💰 اعطاء</button></div>
<div class="box"><h3>6- اعطاء ايتم</h3><input id="itemId" placeholder="ID اللاعب"><input id="itemName" placeholder="اسم الايتم"><input id="itemAmount" type="number" placeholder="الكمية"><button class="purple" onclick="giveItem()">🎁 اعطاء</button></div>
<div class="box"><h3>7- بان شات</h3><input id="muteId" placeholder="ID اللاعب"><button class="orange" onclick="muteChat()">🔇 كتم دائم</button><button class="blue" onclick="unmuteChat()">🔊 فك كتم</button></div>
<div class="box"><h3>8- ارسال رسالة</h3><input id="msgId" placeholder="ID اللاعب"><input id="msgText" placeholder="الرسالة"><button class="blue" onclick="sendMsg()">📨 ارسال</button></div>
<div class="box"><h3>9- عرض شات اللاعب</h3><input id="chatId" placeholder="ID اللاعب"><button onclick="loadChat()">💬 عرض</button><div id="chatBox" style="height:200px">اكتب ID ودوس عرض</div></div>
<div class="box"><h3>10- سجل الحظرات</h3><button onclick="loadLogs()">📜 تحديث السجل</button><div id="logBox" style="height:200px">دوس تحديث السجل</div></div>
<div class="box"><h3>11- تليبورت لاعب</h3><input id="tpId" placeholder="ID اللاعب"><input id="tpTarget" placeholder="ID الهدف"><button class="purple" onclick="teleport()">🚀 سحب</button></div>
<div class="box"><h3>12- نسخ احتياطي</h3><button class="blue" onclick="backup()">💾 تحميل النسخة</button></div>
<div class="box"><h3>13- اعلان للكل</h3><input id="broadcastMsg" placeholder="اكتب الاعلان هنا" style="width:60%"><button class="orange" onclick="broadcast()">📢 ارسال</button></div>

<div id="newFeatures" style="border:3px solid #00ff88;padding:10px;border-radius:10px;margin:20px 0;"><h2 style="color:#00ff88">⚡ الميزات الجديدة 14 - 30</h2></div>

<div class="box"><h3>14- عرض مخزن اللاعب</h3><input id="invId" placeholder="ID اللاعب"><button class="purple" onclick="loadInv()">🎒 عرض</button><div id="invBox" style="min-height:100px">اكتب ID ودوس عرض</div></div>
<div class="box"><h3>15- حظر جهاز</h3><input id="hwidId" placeholder="ID اللاعب"><input id="hwidVal" placeholder="HWID الجهاز"><button class="red" onclick="banHwid()">💻 حظر جهاز</button></div>
<div class="box"><h3>16- الشات العام لايف</h3><button class="green" onclick="loadGlobalChat()">📡 تحديث الشات</button><div id="globalChatBox" style="height:250px">دوس تحديث الشات</div></div>
<div class="box"><h3>17- تعديل لفل اللاعب</h3><input id="levelId" placeholder="ID اللاعب"><input id="levelVal" type="number" placeholder="اللفل الجديد"><button class="purple" onclick="setLevel()">⭐ تعديل</button></div>
<div class="box"><h3>18- اعادة تشغيل السيرفر</h3><button class="red" onclick="restartServer()">🔄 ريستارت</button></div>
<div class="box"><h3>19- كتم شات مؤقت</h3><input id="tempMuteId" placeholder="ID اللاعب"><input id="muteMinutes" type="number" placeholder="عدد الدقايق"><button class="orange" onclick="tempMute()">⏰ كتم مؤقت</button></div>
<div class="box"><h3>20- سحب فلوس من اللاعب</h3><input id="takeMoneyId" placeholder="ID اللاعب"><input id="takeMoneyAmount" type="number" placeholder="المبلغ"><button class="red" onclick="takeMoney()">💸 سحب</button></div>
<div class="box"><h3>21- الكلمات الممنوعة</h3><input id="newWord" placeholder="ضيف كلمة ممنوعة"><button class="red" onclick="addWord()">🚫 اضافة</button><div id="wordsList" style="margin-top:10px;color:#ff4444">كس, شرموط, منيك</div></div>
<div class="box"><h3>22- تتبع مكان اللاعب</h3><input id="trackId" placeholder="ID اللاعب"><button class="blue" onclick="trackPlayer()">📍 تتبع</button><div id="trackResult" style="margin-top:10px;color:#00ff88"></div></div>
<div class="box"><h3>23- حظر سكن معين</h3><input id="banSkinId" placeholder="ID اللاعب"><input id="banSkinName" placeholder="اسم السكن"><button class="red" onclick="banSkin()">👕 حظر السكن</button></div>
<div class="box"><h3>24- اعطاء VIP</h3><input id="vipId" placeholder="ID اللاعب"><select id="vipDays"><option value="7">7 ايام</option><option value="30">30 يوم</option><option value="999">دائم</option></select><button class="yellow" onclick="giveVip()">👑 اعطاء VIP</button></div>
<div class="box"><h3>25- ريستارت وهمي للكل</h3><button class="orange" onclick="fakeRestart()">⚠️ تخويف السيرفر</button></div>
<div class="box"><h3>26- حظر من الروم</h3><input id="banRoomId" placeholder="ID اللاعب"><input id="banRoomName" placeholder="اسم الروم"><button class="red" onclick="banRoom()">🏠 حظر روم</button></div>
<div class="box"><h3>27- تجسس شات خاص</h3><input id="pmId" placeholder="ID اللاعب"><button class="purple" onclick="loadPM()">🕵️ عرض</button><div id="pmBox" style="height:200px">اكتب ID ودوس عرض</div></div>
<div class="box"><h3>28- تجميد اللاعب</h3><input id="freezeId" placeholder="ID اللاعب"><button class="blue" onclick="freezePlayer()">🧊 تجميد/فك</button></div>
<div class="box"><h3>29- سرقة فلوس اللاعب</h3><input id="stealId" placeholder="ID اللاعب"><button class="red" onclick="stealMoney()">💰 اسرق فلوسه</button></div>
<div class="box"><h3>30- انتحال شخصية</h3><input id="impersonateId" placeholder="ID اللاعب"><input id="impersonateMsg" placeholder="الرسالة" style="width:40%"><button class="purple" onclick="impersonate()">🎭 تكلم باسمه</button></div>
</div></div>

<script>
const API = "https://shadowking-server.onrender.com";
let adminName = ""; let words = ["كس", "شرموط", "منيك"];
async function login(){let res=await fetch(API+"/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:playerId.value,password:pass.value,hwid:"PC-"+Math.random()})});let data=await res.json();msg.innerHTML=data.msg;if(data.success){adminName=playerId.value;loginScreen.style.display='none';adminPanel.style.display='block';loadPlayers();loadStats();}}
async function loadStats(){let res=await fetch(API+"/api/stats");let data=await res.json();online.innerHTML=data.online;total.innerHTML=data.total;banned.innerHTML=data.banned;}
async function loadPlayers(){let res=await fetch(API+"/api/players");let users=await res.json();window.allUsers=users;renderTable(users);}
function renderTable(users){let table="<tr><th>ID</th><th>IP</th><th>لفل</th><th>فلوس</th><th>VIP</th><th>حالة</th><th>شات</th><th>اخر دخول</th><th>فك</th></tr>";users.forEach(u=>{let status=u.banned?"<span style='color:red'>محظور</span>":u.frozen?"<span class='frozen'>🧊 مجمد</span>":"نشط";let chat=u.chatMuted?"<span style='color:orange'>مكتوم</span>":"مفتوح";let vip=u.vip?"<span class='vip'>👑</span>":"-";let unban=u.banned?`<button onclick="unban('${u.playerId}')">فك</button>`:"-";table+=`<tr><td>${u.playerId}</td><td>${u.ip||'-'}</td><td>${u.level||1}</td><td>${u.money||0}</td><td>${vip}</td><td>${status}</td><td>${chat}</td><td>${u.lastLogin?new Date(u.lastLogin).toLocaleString('ar-EG'):'-'}</td><td>${unban}</td></tr>`});playersTable.innerHTML=table;}
function searchPlayer(){let val=search.value.toLowerCase();renderTable(window.allUsers.filter(u=>u.playerId.toLowerCase().includes(val)));}
async function banPlayer(){let res=await fetch(API+"/api/ban",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:banId.value,days:parseInt(banDays.value),admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function banIp(){let res=await fetch(API+"/api/banip",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:banIpId.value,admin:adminName})});alert((await res.json()).msg);}
async function kick(){let res=await fetch(API+"/api/kick",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:kickId.value,admin:adminName})});alert((await res.json()).msg);}
async function giveMoney(){let res=await fetch(API+"/api/givemoney",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:moneyId.value,amount:moneyAmount.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function giveItem(){let res=await fetch(API+"/api/giveitem",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:itemId.value,item:itemName.value,amount:itemAmount.value,admin:adminName})});alert((await res.json()).msg);}
async function muteChat(){let res=await fetch(API+"/api/mutechat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:muteId.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function unmuteChat(){let res=await fetch(API+"/api/unmutechat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:muteId.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function sendMsg(){let res=await fetch(API+"/api/sendmsg",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:msgId.value,msg:msgText.value,admin:adminName})});alert((await res.json()).msg);}
async function unban(id){let res=await fetch(API+"/api/unban",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:id,admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function loadChat(){let res=await fetch(API+"/api/chat/"+chatId.value);let data=await res.json();chatBox.innerHTML=data.chat.length?data.chat.join('<br>'):"لا يوجد رسائل";}
async function loadLogs(){let res=await fetch(API+"/api/logs");let logs=await res.json();logBox.innerHTML=logs.reverse().map(l=>`[${l.time}] ${l.admin} عمل ${l.action} على ${l.target} - ${l.details}`).join('<br>');}
async function teleport(){let res=await fetch(API+"/api/teleport",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:tpId.value,targetId:tpTarget.value,admin:adminName})});alert((await res.json()).msg);}
function backup(){ window.open(API+"/api/backup"); }
async function broadcast(){let res=await fetch(API+"/api/broadcast",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({msg:broadcastMsg.value,admin:adminName})});alert((await res.json()).msg);}
async function loadInv(){let res=await fetch(API+"/api/inventory/"+invId.value);let data=await res.json();invBox.innerHTML = data.inventory.length? data.inventory.map(i=>`${i.amount} x ${i.item}`).join('<br>') : "المخزن فاضي";}
async function banHwid(){let res=await fetch(API+"/api/banhwid",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:hwidId.value,hwid:hwidVal.value,admin:adminName})});alert((await res.json()).msg);}
async function loadGlobalChat(){let res=await fetch(API+"/api/globalchat");let data=await res.json();globalChatBox.innerHTML = data.chat.length? data.chat.join('<br>') : "لا يوجد رسائل";globalChatBox.scrollTop = globalChatBox.scrollHeight;}
async function setLevel(){let res=await fetch(API+"/api/setlevel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:levelId.value,level:levelVal.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function restartServer(){if(confirm("متاكد بدك تعمل ريستارت للسيرفر؟")){let res=await fetch(API+"/api/restart",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({admin:adminName})});alert((await res.json()).msg);}}
async function tempMute(){let res=await fetch(API+"/api/tempmute",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:tempMuteId.value,minutes:parseInt(muteMinutes.value),admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function takeMoney(){let res=await fetch(API+"/api/takemoney",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:takeMoneyId.value,amount:takeMoneyAmount.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}
function addWord(){if(newWord.value &&!words.includes(newWord.value)){words.push(newWord.value);wordsList.innerHTML = words.join(", ");newWord.value = "";alert("✅ تم اضافة الكلمة");}}
async function trackPlayer(){let res=await fetch(API+"/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:trackId.value,admin:adminName})});let data=await res.json();trackResult.innerHTML = data.success? data.msg : "❌ اللاعب مش موجود";}
async function banSkin(){let res=await fetch(API+"/api/banskin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:banSkinId.value,skin:banSkinName.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function giveVip(){let res=await fetch(API+"/api/givevip",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:vipId.value,days:parseInt(vipDays.value),admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function fakeRestart(){if(confirm("متاكد بدك تخوف السيرفر كله؟")){let res=await fetch(API+"/api/fakerestart",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({admin:adminName})});alert((await res.json()).msg);}}
async function banRoom(){let res=await fetch(API+"/api/banroom",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:banRoomId.value,room:banRoomName.value,admin:adminName})});alert((await res.json()).msg);}
async function loadPM(){let res=await fetch(API+"/api/pmlogs/"+pmId.value);let data=await res.json();pmBox.innerHTML = data.pm.length? data.pm.join('<br>') : "لا يوجد رسائل خاصة";}
async function freezePlayer(){let res=await fetch(API+"/api/freeze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:freezeId.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function stealMoney(){let res=await fetch(API+"/api/stealmoney",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:stealId.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}
async function impersonate(){let res=await fetch(API+"/api/impersonate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:impersonateId.value,msg:impersonateMsg.value,admin:adminName})});alert((await res.json()).msg);}
// 30 - حظر من الروم
async function banRoom(){let res=await fetch(API+"/api/banroom",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:banRoomId.value,room:banRoomName.value,admin:adminName})});alert((await res.json()).msg);}

// 31 - عرض الرسائل الخاصة
async function loadPM(){let res=await fetch(API+"/api/pmlogs/"+pmId.value);let data=await res.json();pmBox.innerHTML = data.pm.length? data.pm.join('<br>') : "لا يوجد رسائل خاصة";}

// 32 - تجميد اللاعب
async function freezePlayer(){let res=await fetch(API+"/api/freeze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:freezeId.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}

// 33 - سرقة فلوس
async function stealMoney(){let res=await fetch(API+"/api/stealmoney",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:stealId.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}

// 34 - انتحال شخصية
async function impersonate(){let res=await fetch(API+"/api/impersonate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:impersonateId.value,msg:impersonateMsg.value,admin:adminName})});alert((await res.json()).msg);}

// 35 - حذف حساب
async function deleteAccount(){if(confirm("متأكد تمسح الحساب نهائي؟")){let res=await fetch(API+"/api/deleteaccount",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:deleteId.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}}

// 36 - اعطاء ادمن
async function giveAdmin(){let res=await fetch(API+"/api/giveadmin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:adminGiveId.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}

// 37 - سحب ادمن
async function takeAdmin(){let res=await fetch(API+"/api/takeadmin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:adminTakeId.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}

// 38 - نسخ مخزن
async function copyInv(){let res=await fetch(API+"/api/copyinv",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:copyInvId.value,admin:adminName})});alert((await res.json()).msg);}

// 39 - مسح مخزن
async function clearInv(){let res=await fetch(API+"/api/clearinv",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:clearInvId.value,admin:adminName})});alert((await res.json()).msg);}

// 40 - سحب اللاعب لعندك
async function tphere(){let res=await fetch(API+"/api/tphere",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:tphereId.value,admin:adminName})});alert((await res.json()).msg);}

// 41 - تغيير اسم
async function changeName(){let res=await fetch(API+"/api/changename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:changeNameId.value,newName:newNameVal.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}

// 42 - وضع الصيانة
async function maintenance(){let status = maintenanceBtn.innerText.includes("تشغيل"); let res=await fetch(API+"/api/maintenance",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:!status,admin:adminName})});let data=await res.json();alert(data.msg);maintenanceBtn.innerText = status? "🔧 تشغيل الصيانة" : "✅ ايقاف الصيانة";}

// 43 - اعطاء دم كامل
async function fullHP(){let res=await fetch(API+"/api/fullhp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:hpId.value,admin:adminName})});alert((await res.json()).msg);}

// 44 - قتل اللاعب
async function killPlayer(){let res=await fetch(API+"/api/kill",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:killId.value,admin:adminName})});alert((await res.json()).msg);}

// 45 - تفعيل لاق
async function lagPlayer(){let res=await fetch(API+"/api/lag",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:lagId.value,admin:adminName})});alert((await res.json()).msg);}

// 46 - تعطيل لاق
async function unlagPlayer(){let res=await fetch(API+"/api/unlag",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:unlagId.value,admin:adminName})});alert((await res.json()).msg);}

// 47 - كتم صوت
async function muteVoice(){let res=await fetch(API+"/api/mutevoice",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:voiceMuteId.value,admin:adminName})});alert((await res.json()).msg);}

// 48 - اعطاء درع
async function giveArmor(){let res=await fetch(API+"/api/givearmor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:armorId.value,admin:adminName})});alert((await res.json()).msg);}

// 49 - طرد الكل
async function kickAll(){if(confirm("متأكد تطرد الكل؟")){let res=await fetch(API+"/api/kickall",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({admin:adminName})});alert((await res.json()).msg);loadPlayers();}}

// 50 - معلومات الجهاز
async function deviceInfo(){let res=await fetch(API+"/api/deviceinfo/"+deviceId.value);let data=await res.json();deviceInfoBox.innerHTML = `IP: ${data.info.ip} <br> HWID: ${data.info.hwid}`;}

// 51 - هدية للكل
async function giftAll(){let res=await fetch(API+"/api/giftall",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({item:giftItem.value,amount:giftAmount.value,admin:adminName})});alert((await res.json()).msg);}

// 52 - تغيير الطقس
async function changeWeather(){let res=await fetch(API+"/api/weather",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({weather:weatherSelect.value,admin:adminName})});alert((await res.json()).msg);}

// 53 - وضع الشبح
async function ghostMode(){let res=await fetch(API+"/api/ghost",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:ghostId.value,admin:adminName})});alert((await res.json()).msg);}

// 54 - اعادة تعيين
async function resetPlayer(){if(confirm("هتمسح فلوس ولفل وايتم اللاعب")){let res=await fetch(API+"/api/resetplayer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:resetId.value,admin:adminName})});alert((await res.json()).msg);loadPlayers();}}

</script></body></html>
