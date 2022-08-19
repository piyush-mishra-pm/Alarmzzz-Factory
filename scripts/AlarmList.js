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

    // deleteAlarm(alarmToRemove) {
    //     this.alarmList = this.alarmList.filter((a) => alarmToRemove != a);
    // }

    editAlarm(uuid) {
        console.log("EDIT ARRAYLIST", uuid);
        console.log(this.alarmList);
    }

    deleteAlarm(uuid) {
        console.log("DELETE ARRAYLIST", uuid);
        this.alarmList = this.alarmList.filter((a) => a.uuid != uuid);
        console.log(this.alarmList);
    }

    // editAlarm(alarmToEdit, newAlarmTime) {
    //     if (!Alarm.valid(alarmToEdit)) return false;

    //     const alarmIndexFound = this.alarmList.findIndex(alarmToEdit);
    //     if (alarmIndexFound == -1) return false;

    //     this.alarmList[alarmIndexFound].setAlarmTime(newAlarmTime);

    //     return true;
    // }
}
