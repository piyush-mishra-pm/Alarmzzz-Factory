import Alarm from "./Alarm.js";
import AlarmList from "./AlarmList.js";

const SAVE_KEY = "Alarmzzz";

function SaveData(alarmsList) {
    window.localStorage.removeItem(SAVE_KEY);
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(alarmsList));
}

function LoadData() {
    const saved = JSON.parse(window.localStorage.getItem(SAVE_KEY));

    // JSON.parse doesnot capture the functions in our AlarmList class objects.
    // JSON.parse can only restore data.
    // So need to deserialise saved data to create AlarmList object with functions.
    return saved ? deserialiseJSON(saved) : new AlarmList();
}

function deserialiseJSON(jsonSaved) {
    const alarmList = new AlarmList();
    jsonSaved.alarmList.forEach((alarm) => {
        const clonedAlarm = Alarm.deepCopy(alarm);
        alarmList.addAlarm(clonedAlarm);
    });
    return alarmList;
}

export { SaveData, LoadData };
