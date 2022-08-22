import * as Views from "./Views.js";
import * as ModalHandlers from "./ModalHandlers";

function init(alarmsPresentList) {
    alarmsPresent = alarmsPresentList;
}

export { init };
/*
 * CURRENT TIME Updates:
 */

const currentTimeDisplay = document.getElementById("current-time-text");

function setCurrentTime() {
    const currentTime = new Date();
    const formattedTime = timeFormatter(currentTime);
    currentTimeDisplay.innerText = formattedTime;
}

function timeFormatter(timeGiven) {
    return (
        String(timeGiven.getHours()).padStart(2, "0") +
        ":" +
        String(timeGiven.getMinutes()).padStart(2, "0") +
        ":" +
        String(timeGiven.getSeconds()).padStart(2, "0")
    );
}

// Update Current Time (being displayed) every sec.
setInterval(setCurrentTime, 1000);

/*
 * Alarm clock list Updates:
 */

// Check Status of alarm clocks every 2 sec.
setInterval(checkAndUpdateAlarmClocksStatus, 2000);
let alarmsPresent;
function checkAndUpdateAlarmClocksStatus() {
    const alarmsCompleted = alarmsPresent.getAlarmsCompleted();
    if (!alarmsCompleted.length) return;
    console.log("Removal Time: ", new Date());
    console.log(alarmsCompleted);
    alarmsCompleted.forEach((al) => alarmsPresent.deleteAlarm(al.uuid));
    Views.generateViewAlarmList(alarmsPresent.alarmList);
    ModalHandlers.alarmArrivedShow(alarmsCompleted);
}
