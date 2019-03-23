var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
  paramValue=parseInt(param[1]);
  console.log(paramValue);
}

var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
if(!idb in navigator){
  alert("Browser is not supported");
}
var open=idb.open("StoreData",1);
console.log("IndexedDB is created");
open.onupgradeneeded=function(event){
var request=event.target.result;
request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}





open.onsuccess=function(event){
var  request=event.target.result;
   var transaction=request.transaction("Formdata","readwrite");
var storeDB=transaction.objectStore("Formdata");
var information=storeDB.get(paramValue);
console.log(paramValue);
information.onsuccess=function(data){
console.log(data.target.result);
 display(data.target.result);
 resume(data.target.result);
}

var main=document.querySelector(".main");
var left=document.querySelector(".left");
var right=document.querySelector(".right");

function display(data){

  var img=document.createElement("img");
  img.src="images/download.jpg";
  right.append(img);
  var name=document.createElement("h3");
  name.textContent= data.name;
  right.append(name);
  main.append(left);
var email=document.createElement("h3");
email.textContent=data.email;
right.append(email);
var role=document.createElement("h3");
role.textContent=data.email;
right.append(role);
var number=document.createElement("h3");
number.textContent=data.number;
right.append(number);

var h2=document.createElement("h2");
h2.textContent="Career Objective";
left.append(h2);

var career=document.createElement("p");
career.textContent=data.career;
left.append(career);
}

function resume(data) {
  var h=document.createElement("h2");
  h.textContent="Education Details";
  left.append(h);
var hr=document.createElement('table');
let row='';
row+="<tr><th>"+"collegename"+"</th><th>"+"degree"+"</th><th>"+"branch"+"</th><th>"+"marks"+"</th><tr>";
for(var i in data.education){
  row+="<tr><td>"+data.education[i].college+"</td><td>"+data.education[i].degree+"</td><td>"+data.education[i].branch+"</td><td>"+data.education[i].marks+"</td></tr>";
}
hr.innerHTML=row;
left.append(hr);
var h=document.createElement("h1");
h.textContent="skills";
left.append(h);
var hr=document.createElement('hr');
left.append(hr);
var h=document.createElement("h2");
h.textContent=data.skills;
left.append(h);
}


}
