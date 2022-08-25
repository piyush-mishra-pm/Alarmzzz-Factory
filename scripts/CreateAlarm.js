import Alarm from "./Alarm.js";
import * as Views from "./Views.js";
import * as PersistenceManager from "./PersistenceManager.js";
import * as Utils from "./Utils.js";

let presentAlarms;
const inputAlarmName = document.getElementById("input--create-alarm--name");
const inputCreateAlarmTime = document.getElementById("input--create-alarm--time");
inputCreateAlarmTime.addEventListener("change", isValidAlarmCreation);
const inputCreateAlarmDisabled = document.getElementById("input--create-alarm--disabled");

const btnCreateAlarm = document.getElementById("btn--create-alarm");
btnCreateAlarm.disabled = true;
btnCreateAlarm.addEventListener("click", onCreateAlarmBtn);

const errorMsg = document.getElementById("create-alarm--error-message");

function init(presentAlarmsList) {
    presentAlarms = presentAlarmsList;
}

let alarmTime;
function isValidAlarmCreation() {
    alarmTime = inputCreateAlarmTime.value;
    if (Date.parse(alarmTime) < Date.now()) {
        console.log("Invalid Date");
        errorMsg.classList.add("invalid-alarmTime");
        errorMsg.innerText = "Wrong Alarm Time! Select Alarm time in future.";
        btnCreateAlarm.disabled = true;
        return false;
    } else {
        console.log("OK Date");
        errorMsg.classList.remove("invalid-alarmTime");
        errorMsg.innerText = "";
        btnCreateAlarm.disabled = false;
        return true;
    }
}

function onCreateAlarmBtn() {
    if (!isValidAlarmCreation()) return;

    alarmTime = inputCreateAlarmTime.value;
    const alarmName = inputAlarmName.value;
    const alarmToAdd = new Alarm(new Date(alarmTime), alarmName, inputCreateAlarmDisabled.checked);
    presentAlarms.addAlarm(alarmToAdd);
    Views.generateViews(presentAlarms);
    PersistenceManager.SaveData(presentAlarms);
    resetInputFields();
}

function resetInputFields() {
    inputAlarmName.value = "";
    // Default alarm time is 1hr from now:
    inputCreateAlarmTime.value = Utils.getISODateStringFromDate(new Date(Date.now() + 3600000));
    inputCreateAlarmDisabled.checked = false;
}

export { init };
