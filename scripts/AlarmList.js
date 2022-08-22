import Alarm from "./Alarm.js";

export default class AlarmList {
    constructor() {
        console.log("Constructor ran");
        this.alarmList = new Array();
    }

    addAlarm(alarmToAdd) {
        if (!Alarm.valid(alarmToAdd)) return false;
        this.alarmList.push(alarmToAdd);
        console.log(this.alarmList);
        return true;
    }

    editAlarm(alarmUpdatesObject) {
        const alarmObjectToEdit = this.getAlarm(alarmUpdatesObject.uuid);
        alarmObjectToEdit.name = alarmUpdatesObject.name;
        alarmObjectToEdit.alarmTime = alarmUpdatesObject.alarmTime;
    }

    deleteAlarm(uuid) {
        this.alarmList = this.alarmList.filter((a) => a.uuid != uuid);
    }

    getAlarm(uuid) {
        return this.alarmList.find((alarm) => alarm.uuid == uuid);
    }

    getAlarmsCompleted() {
        const dateTimeNow = Date.now();
        return this.alarmList.filter(
            (alarm) => Date.parse(alarm.alarmTime) <= dateTimeNow
        );
    }
}
