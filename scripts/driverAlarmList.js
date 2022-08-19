import AlarmList from "./AlarmList.js";

const alarmListDOM = document.getElementById("alarm-list-container");
const alarmsPresent = new AlarmList();
alarmsPresent.addAlarm(new Date());
alarmListDOM.innerText += alarmsPresent;
