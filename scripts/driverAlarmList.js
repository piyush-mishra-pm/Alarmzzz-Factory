import * as View from "./Views.js";
import * as EventHandlers from "./EventHandlers.js";
import * as CreateAlarm from "./CreateAlarm.js";
import * as ChronHandler from "./ChronHandler.js";
import * as PersistenceManager from "./PersistenceManager.js";

const alarmsPresent = PersistenceManager.LoadData();

EventHandlers.init(alarmsPresent);
CreateAlarm.init(alarmsPresent);
ChronHandler.init(alarmsPresent);

View.generateViews(alarmsPresent);
