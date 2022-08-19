export default class Alarm {
  constructor(alarmTime) {
    if (!valid(alarmTime)) return;
    this.alarmTime = alarmTime;
  }

  setAlarmTime(newAlarmTime) {
    if (!valid(newAlarmTime)) return false;
    alarmTime = newAlarmTime;
    return true;
  }

  getAlarmTime() {
    return this.alarmTime;
  }

  static valid(alarmTime) {
    return true;
  }
}
