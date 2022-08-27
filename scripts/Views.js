import * as Utils from "./Utils.js";

function generateViews(alarmsListObject) {
    console.log("View Triggered");
    // Generate Active Alarms MarkUp:
    factoryAlarmMarkUp(alarmsListObject.getAlarmsActive(), "ul--alarm-active");
    //updateRemainingTimes(alarmsListObject.getAlarmsActive(), "ul--alarm-active");
    // Generate Finished Alarms MarkUp:
    factoryAlarmMarkUp(alarmsListObject.getAlarmsFinished(), "ul---alarm-finished");
    // Generate Disabled Alarms MarkUp:
    factoryAlarmMarkUp(alarmsListObject.getAlarmsDisabled(), "ul--alarm-disabled");
}

function factoryAlarmMarkUp(alarmList, ulId) {
    const ul = document.getElementById(ulId);
    const template = document.getElementById("template--li--alarm");
    ul.innerHTML = "";
    alarmList.forEach((alarm) => {
        const cloned = template.content.cloneNode(true);
        cloned.querySelector(".li--alarm").dataset.uuid = alarm.uuid;
        cloned.querySelector(".time--alarm").innerHTML = Utils.timeFormatter(alarm.alarmTime);
        cloned.querySelector(".time--alarm--dmy").innerHTML = Utils.timeFormatter_DYM(alarm.alarmTime);
        cloned.querySelector(".description--alarm").innerHTML = alarm.name;
        cloned.querySelector(".uuid--alarm").innerHTML = alarm.uuid;
        cloned.querySelector(".btn-toggle-disable").checked = alarm.getDisabledStatus();
        const remainingTime = alarm.getRemainingTime();
        cloned.querySelector(".txt-remainingTime").innerText = remainingTime ? Utils.getDuration(remainingTime) : "";
        const labelRemainingTime = cloned.querySelector(".div-remainingTime");
        if (remainingTime) labelRemainingTime.classList.remove("hidden");
        else labelRemainingTime.classList.add("hidden");
        ul.appendChild(cloned);
    });
}

function updateRemainingTimes(activeAlarms) {
    document.querySelectorAll(".txt-remainingTime").forEach((alNode) => {
        //console.log(alNode);
        const uuidOfAlarm = alNode.closest(".li--alarm").dataset.uuid;
        //console.log(uuidOfAlarm);
        const alarmObject = activeAlarms.getAlarm(uuidOfAlarm);
        //console.log(alarmObject);
        const remainingTime = alarmObject.getRemainingTime();
        if (remainingTime) alNode.innerText = Utils.getDuration(remainingTime);
    });
}
export { generateViews, updateRemainingTimes };
