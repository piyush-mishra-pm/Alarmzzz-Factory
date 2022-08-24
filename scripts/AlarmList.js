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
        alarmObjectToEdit.disabled = alarmUpdatesObject.disabled;
        // Alarm UUID is kept constant across edits for the same Alarm.
        this.updateAlarmsFinishedStatus();
    }

    deleteAlarm(uuid) {
        this.alarmList = this.alarmList.filter((a) => a.uuid != uuid);
    }

    getAlarm(uuid) {
        return this.alarmList.find((alarm) => alarm.uuid == uuid);
    }

    getAlarmsFinished() {
        return this.alarmList.filter((alarm) => !alarm.getDisabledStatus() && alarm.getUpdatedFinishedStatus());
    }

    updateAlarmsFinishedStatus() {
        this.getAlarmsFinished();
    }

    getAlarmsDisabled() {
        return this.alarmList.filter((alarm) => alarm.getDisabledStatus());
    }

    // Returns alarms which are neither disabled nor finished yet.
    getAlarmsActive() {
        return this.alarmList.filter((alarm) => !(alarm.disabled || alarm.finished));
    }
}
