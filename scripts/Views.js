import * as Utils from "./Utils.js";

function generateViews(alarmsListObject) {
    console.log("View Triggered");
    // Generate Active Alarms MarkUp:
    factoryAlarmMarkUp(alarmsListObject.getAlarmsActive(), "ul--alarm-active");
    updateRemainingTimes(alarmsListObject.getAlarmsActive(), "ul--alarm-active");
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
        cloned.querySelector(".time--alarm").innerHTML = alarm.alarmTime;
        cloned.querySelector(".description--alarm").innerHTML = alarm.name;
        cloned.querySelector(".uuid--alarm").innerHTML = alarm.uuid;
        cloned.querySelector(".btn-toggle-disable").checked = alarm.getDisabledStatus();
        if (ulId === "ul--alarm-active")
            cloned.querySelector(".txt-remainingTime").innerText = Utils.getDuration(
                alarm.getRemainingTime(alarm.alarmTime)
            );
        ul.appendChild(cloned);
    });
}

function updateRemainingTimes(activeAlarms) {
    document.querySelectorAll("txt-remainingTime").forEach((alNode) => {
        const uuidOfAlarm = alNode.closest("li--alarm").dataset.uuid;
        const alarmObject = activeAlarms.getAlarm(uuidOfAlarm);
        const remainingTime = alarmObject.getRemainingTime();
        if (remainingTime) alNode.innerText = Utils.getDuration(remainingTime);
    });
}
export { generateViews, updateRemainingTimes };
