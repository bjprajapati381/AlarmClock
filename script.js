const selectMenu = document.querySelectorAll("select"),
  currentTime = document.querySelector("h1"),
  setAlarmBtn = document.querySelector("button"),
  content = document.querySelector(".content");
let alarmTime,
  isAlarmSet,
  ringtone = new Audio("./files/ringtone.mp3");
function insertOption(time, len) {
  for (let i = len; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[time].firstElementChild.insertAdjacentHTML("afterend", option);
  }
}
insertOption(0, 12);
insertOption(1, 60);
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  //getting hour, minutes and seconds
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  //if hour value is 0,set this value to 12
  h = h == 0 ? h = 12 : h;

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
  if (alarmTime == `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
});

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return isAlarmSet=false;
  }
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("plese, select a valid time to set Alarm!");
  }
  isAlarmSet=true;
  alarmTime=time;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);