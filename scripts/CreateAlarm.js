import Alarm from "./Alarm.js";
import * as Views from "./Views.js";

let inputAlarmName;
let inputCreateAlarmTime;
let btnCreateAlarm;
let alarmTime;
let errorMsg;
let presentAlarms;

function init(presentAlarmsList) {
    inputAlarmName = document.getElementById("input--create-alarm--name");
    inputCreateAlarmTime = document.getElementById("input--create-alarm--time");
    inputCreateAlarmTime.addEventListener("change", validateCreateAlarmTime);

    btnCreateAlarm = document.getElementById("btn--create-alarm");
    btnCreateAlarm.disabled = true;
    btnCreateAlarm.addEventListener("click", onCreateAlarmBtn);

    errorMsg = document.getElementById("create-alarm--error-message");
    presentAlarms = presentAlarmsList;
}

function validateCreateAlarmTime() {
    alarmTime = inputCreateAlarmTime.value;
    if (Date.parse(alarmTime) < Date.now()) {
        console.log("Invalid Date");
        errorMsg.classList.add("invalid-alarmTime");
        errorMsg.innerText = "Wrong Alarm Time! Select Alarm time in future.";
        btnCreateAlarm.disabled = true;
    } else {
        console.log("OK Date");
        errorMsg.classList.remove("invalid-alarmTime");
        errorMsg.innerText = "";
        btnCreateAlarm.disabled = false;
    }
}

function onCreateAlarmBtn() {
    alarmTime = inputCreateAlarmTime.value;
    console.log("Creating Alarm", alarmTime);
    const alarmName = inputAlarmName.value;
    const alarmToAdd = new Alarm(new Date(alarmTime), alarmName);
    presentAlarms.addAlarm(alarmToAdd);
    Views.generateViewAlarmList(presentAlarms.alarmList);
}

export { init };
