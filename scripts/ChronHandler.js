import * as Views from "./Views.js";
import * as Utils from "./Utils.js";

let alarmsPresent;

function init(alarmsListObject) {
    alarmsPresent = alarmsListObject;
}

// Update Current Time (being displayed) every sec.
setTimeout(() => {
    // Update Current Time in display:
    setInterval(setCurrentTime, 1000);
    // Check Status of alarm clocks every 2 sec:
    setInterval(checkAndUpdateAlarmClocksStatus, 2000);
}, 2000);

export { init };

/*
 * Current Time Updates:
 */

const currentTimeDisplay = document.getElementById("current-time-text");

function setCurrentTime() {
    const currentTime = new Date();
    const formattedTime = Utils.timeFormatter(currentTime);
    currentTimeDisplay.innerText = formattedTime;
}

/*
 * Periodically update alarm finished status:
 */
function checkAndUpdateAlarmClocksStatus() {
    const recentInfo = ifAlarmsRecentlyFinished();
    if (recentInfo.isAlarmRecentlyFinished) {
        window.alert(
            `Alarm Finished!\n
${recentInfo.alarmsNewlyFinished.map(
    (al) => `-> ${al.name} ${al.alarmTime}\n`
)}`
        );
        Views.generateViews(alarmsPresent);
    }
}

const seenFinishedAlarm = new Set();
function ifAlarmsRecentlyFinished() {
    let isAlarmRecentlyFinished = false;
    const alarmsNewlyFinished = [];
    const finishedAlarmsSoFar = alarmsPresent.getAlarmsFinished();
    for (const finishedAlarm of finishedAlarmsSoFar) {
        if (!seenFinishedAlarm.has(finishedAlarm)) {
            seenFinishedAlarm.add(finishedAlarm);
            alarmsNewlyFinished.push(finishedAlarm);
            isAlarmRecentlyFinished = true;
        }
    }
    return { isAlarmRecentlyFinished, alarmsNewlyFinished };
}
