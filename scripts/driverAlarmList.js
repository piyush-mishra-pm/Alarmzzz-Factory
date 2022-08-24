import Alarm from "./Alarm.js";
import AlarmList from "./AlarmList.js";
import * as View from "./Views.js";
import * as ModalHandlers from "./ModalHandlers.js";
import * as CreateAlarm from "./CreateAlarm.js";
import * as ChronHandler from "./ChronHandler.js";

const anAlarm = new Alarm(new Date(Date.now() + 10000), "Alarm 1", false);
const anAlarm1 = new Alarm(new Date(Date.now() + 15000), "Alarm 2", false);
const anAlarm2 = new Alarm(new Date(Date.now() + 30000), "Alarm 3", false);
const anAlarm2_ = new Alarm(new Date(Date.now() + 30000), "Alarm 3_", false);
const anAlarm3 = new Alarm(
    new Date(Date.now() + 40000),
    "Alarm Disabled",
    true
);

const alarmsPresent = new AlarmList();
alarmsPresent.addAlarm(anAlarm);
alarmsPresent.addAlarm(anAlarm1);
alarmsPresent.addAlarm(anAlarm2);
alarmsPresent.addAlarm(anAlarm2_);
alarmsPresent.addAlarm(anAlarm3);

ModalHandlers.init(alarmsPresent);
CreateAlarm.init(alarmsPresent);
ChronHandler.init(alarmsPresent);

View.generateViews(alarmsPresent);
