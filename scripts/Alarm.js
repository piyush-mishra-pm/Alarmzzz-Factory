export default class Alarm {
    constructor(alarmTime, name, isDisabled) {
        if (!Alarm.valid(alarmTime)) return;
        this.alarmTime = alarmTime;
        this.name = name ? name : "";
        this.uuid = new Date().getTime() + Math.random() * 100;
        this.disabled = isDisabled ? true : false;
        this.finished = alarmTime <= Date.now() ? true : false;
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

    static deepCopy(alarm) {
        const clonedAlarm = new Alarm(alarm.alarmTime, alarm.name, alarm.disabled);
        clonedAlarm.uuid = alarm.uuid;
        clonedAlarm.getUpdatedFinishedStatus();
        return clonedAlarm;
    }

    getDisabledStatus() {
        return this.disabled;
    }

    toggleDisabledStatus() {
        this.disabled = !this.disabled;
        return this.disabled;
    }

    setDisabledStatusAlarm(isDisabled) {
        this.disabled = isDisabled;
        return this;
    }

    getUpdatedFinishedStatus() {
        const dateNow = Date.now();
        const isFinished = this.alarmTime <= dateNow;
        this.finished = isFinished;
        return isFinished;
    }
}
