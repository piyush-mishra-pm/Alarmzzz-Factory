export default class Alarm {
    constructor(alarmTime, name) {
        if (!Alarm.valid(alarmTime)) return;
        this.alarmTime = alarmTime;
        this.name = name ? name : "";
        this.uuid = new Date().getTime() + Math.random() * 100;
    }

    setAlarmTime(newAlarmTime) {
        if (!Alarm.valid(newAlarmTime)) return false;
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
