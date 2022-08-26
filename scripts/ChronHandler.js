import * as Views from "./Views.js";
import * as Utils from "./Utils.js";
import * as PersistenceManager from "./PersistenceManager.js";

let alarmsPresent;

function init(alarmsListObject) {
    alarmsPresent = alarmsListObject;
}

// Update Current Time in display:
setInterval(chronUpdate, 1000);

export { init };

/*
 * Current Time Updates:
 */

const currentTimeDisplay = document.getElementById("current-time-text");

function chronUpdate() {
    // Update Current time Display:
    const currentTime = new Date();
    const formattedTime = Utils.timeFormatter(currentTime);
    currentTimeDisplay.innerText = formattedTime;

    // Periodically update remaining times in all active alarms:
    Views.updateRemainingTimes(alarmsPresent);

    // Update status of all alarms: (Finishing of new alarms and alerts of newly finished alarms).
    checkAndUpdateAlarmClocksStatus();
}

/*
 * Periodically update alarm finished status:
 */
function checkAndUpdateAlarmClocksStatus() {
    const recentInfo = ifAlarmsRecentlyFinished();
    if (recentInfo.isAlarmRecentlyFinished) {
        window.alert(
            `Alarm Finished!\n
${recentInfo.alarmsNewlyFinished.map((al) => `-> ${al.name} ${al.alarmTime}\n`)}`
        );
        Views.generateViews(alarmsPresent);
        PersistenceManager.SaveData(alarmsPresent);
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
