function generateViewAlarmList(alarmList) {
    const ul = document.getElementById("ul--alarm-list");
    const template = document.getElementById("temp--li--alarm");

    ul.innerHTML = "";
    alarmList.forEach((alarm) => {
        const cloned = template.content.cloneNode(true);
        cloned.querySelector(".li-alarm").dataset.uuid = alarm.uuid;
        cloned.querySelector(".time").innerHTML = alarm.alarmTime;
        cloned.querySelector(".description").innerHTML = alarm.name;
        cloned.querySelector(".uuid").innerHTML = alarm.uuid;
        ul.appendChild(cloned);
    });
}

export { generateViewAlarmList };
