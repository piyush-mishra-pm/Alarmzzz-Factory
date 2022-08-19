import Alarm from "./Alarm.js";

export default class AlarmList {
  constructor() {
    this.alarmList = [];
  }

  addAlarm(alarmToAdd) {
    if (!Alarm.valid(alarmToAdd)) return false;
    alarmList.push(alarmToAdd);
    return true;
  }

  removeAlarm(alarmToRemove) {
    alarmList = alarmList.filter((a) => alarmToRemove != a);
  }

  editAlarm(alarmToEdit, newAlarmTime) {
    if (!Alarm.valid(alarmToEdit)) return false;

    const alarmIndexFound = this.alarmList.findIndex(alarmToEdit);
    if (alarmIndexFound == -1) return false;

    alarmList[alarmIndexFound].setAlarmTime(newAlarmTime);

    return true;
  }
}
