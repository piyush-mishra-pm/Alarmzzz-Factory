import Alarm from "./Alarm.js";
import AlarmList from "./AlarmList.js";
import * as View from "./Views.js";
import * as ModalHandlers from "./ModalHandlers.js";
import * as CreateAlarm from "./CreateAlarm.js";
import * as ChronHandler from "./ChronHandler.js";

const anAlarm = new Alarm(new Date() + 5000, "Alarm 1");
const anAlarm1 = new Alarm(new Date(Date.now() + 10000), "Alarm 2");
const anAlarm2 = new Alarm(new Date(Date.now() + 15000), "Alarm 3");
const alarmsPresent = new AlarmList();

alarmsPresent.addAlarm(anAlarm);
alarmsPresent.addAlarm(anAlarm1);
alarmsPresent.addAlarm(anAlarm2);
View.generateViewAlarmList(alarmsPresent.alarmList);

document.getElementById("ul--alarm-list").addEventListener("click", (e) => {
    if (e.target.matches(".eh-delete")) {
        const uuidToDelete = e.target.closest(".li-alarm").dataset.uuid;
        ModalHandlers.showConfirmDeleteModal(uuidToDelete, alarmsPresent);
        View.generateViewAlarmList(alarmsPresent.alarmList);
    } else if (e.target.matches(".eh-edit")) {
        const uuidToEdit = e.target.closest(".li-alarm").dataset.uuid;
        ModalHandlers.showEditModal(uuidToEdit, alarmsPresent);
        View.generateViewAlarmList(alarmsPresent.alarmList);
    }
});

CreateAlarm.init(alarmsPresent);
ChronHandler.init(alarmsPresent);
