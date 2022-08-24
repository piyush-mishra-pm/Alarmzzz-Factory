function generateViews(alarmsListObject) {
    console.log("View Triggered");
    // Generate Active Alarms MarkUp:
    factoryAlarmMarkUp(alarmsListObject.getAlarmsActive(), "ul--alarm-active");
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
        ul.appendChild(cloned);
    });
}
export { generateViews };
