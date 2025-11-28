// --- LIVE CLOCK ---
function updateClock() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString(undefined, options);
  document.getElementById('clock').innerText = `${date} | ${time}`;
}
setInterval(updateClock, 1000);
updateClock();

// --- LOGIN SYSTEM ---
const adminPassword = "ABPS1A2025";
let currentStudent = "";

function adminLogin(){
  const pw = document.getElementById('admin-password').value;
  if(pw === adminPassword){
    document.getElementById('login').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    loadTasks();
    loadPSFiles();
    loadAnnouncements();
    displayAttendance();
  } else alert("Incorrect admin password");
}

function studentLogin(){
  const name = document.getElementById('student-name-input').value.trim();
  if(name===""){ alert("Enter your name"); return; }
  currentStudent = name;
  document.getElementById('login').style.display = 'none';
  document.getElementById('student-dashboard').style.display = 'block';
  document.getElementById('student-name').innerText = currentStudent;
  loadTasks(); loadPSFiles(); loadAnnouncements();
}

function logout(){
  currentStudent = "";
  document.getElementById('login').style.display = 'block';
  document.getElementById('student-dashboard').style.display = 'none';
  document.getElementById('admin-dashboard').style.display = 'none';
}

// --- TASKS ---
let tasks = [];
function addTask(){ const t=document.getElementById('new-task').value.trim(); if(t){ tasks.push(t); document.getElementById('new-task').value=''; displayTasks(); } }
function loadTasks(){ displayTasks(); }
function displayTasks(){
  const list = document.getElementById('tasks-list')||document.getElementById('task-completion-list');
  if(!list) return;
  list.innerHTML='';
  tasks.forEach(task=>{const li=document.createElement('li');li.textContent=task;list.appendChild(li);});
}

// --- ATTENDANCE ---
let attendance = {};
function markAttendance(){
  const today=new Date().toISOString().split('T')[0];
  attendance[currentStudent+'_'+today]=true;
  displayAttendance();
  document.getElementById('attendance-status').innerText = "Attendance marked for "+today;
}

function displayAttendance(){
  const list = document.getElementById('attendance-list');
  if(!list) return;
  list.innerHTML = '';
  Object.keys(attendance).forEach(key=>{
    const name = key.split('_')[0];
    const date = key.split('_')[1];
    const li = document.createElement('li');
    li.textContent = `${name} marked present on ${date}`;
    list.appendChild(li);
  });
}

// --- POLITICAL SCIENCE RESOURCES ---
let psResources = [];
function uploadPSFile(){ const f=document.getElementById('ps-file-upload').files[0]; if(f){ psResources.push(f.name); displayPSResources(); } }
function loadPSFiles(){ displayPSResources(); }
function displayPSResources(){
  const list=document.getElementById('ps-resources-list')||document.getElementById('ps-files-list'); if(!list) return;
  list.innerHTML='';
  psResources.forEach(f=>{const li=document.createElement('li'); li.textContent=f; list.appendChild(li);});
}

// --- ANNOUNCEMENTS ---
let announcements=[];
function postAnnouncement(){ const t=document.getElementById('new-announcement').value.trim(); if(t){ announcements.push(t); document.getElementById('new-announcement').value=''; displayAnnouncements(); } }
function loadAnnouncements(){ displayAnnouncements(); }
function displayAnnouncements(){ const list=document.getElementById('announcements-list')||document.getElementById('announcements-admin-list'); if(!list) return; list.innerHTML=''; announcements.forEach(a=>{ const li=document.createElement('li'); li.textContent=a; list.appendChild(li);}); }