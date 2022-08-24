function generateViews(alarmsListObject) {
    console.log("View Triggered");
    generateActiveAlarmsSection(alarmsListObject.getAlarmsActive());
    generateDisabledAlarmsSection(alarmsListObject.getAlarmsDisabled());
    generateFinishedAlarmsSection(alarmsListObject.getAlarmsFinished());
}

function generateActiveAlarmsSection(activeAlarms) {
    const ul = document.getElementById("ul--alarm-list");
    const template = document.getElementById("temp--li--alarm");

    ul.innerHTML = "";
    activeAlarms.forEach((alarm) => {
        const cloned = template.content.cloneNode(true);
        cloned.querySelector(".li-alarm").dataset.uuid = alarm.uuid;
        cloned.querySelector(".time").innerHTML = alarm.alarmTime;
        cloned.querySelector(".description").innerHTML = alarm.name;
        cloned.querySelector(".uuid").innerHTML = alarm.uuid;
        ul.appendChild(cloned);
    });
}

function generateDisabledAlarmsSection(disabledAlarmsList) {}

function generateFinishedAlarmsSection(finishedAlarmsList) {
    const ul = document.getElementById("ul--modal-window-alarm-arrived");
    const template = document.getElementById("template--alarm-arrived--li");
    ul.innerHTML = "";
    finishedAlarmsList.forEach((alarm) => {
        const cloned = template.content.cloneNode(true);
        cloned.querySelector(".li--alarm-arrived").dataset.uuid = alarm.uuid;
        cloned.querySelector(".time--alarm-arrived").innerHTML =
            alarm.alarmTime;
        cloned.querySelector(".description--alarm-arrived").innerHTML =
            alarm.name;
        cloned.querySelector(".uuid--alarm-arrived").innerHTML = alarm.uuid;

        ul.appendChild(cloned);
    });
}

export { generateViews };
