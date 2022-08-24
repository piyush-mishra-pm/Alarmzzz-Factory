import * as Views from "./Views.js";

let alarmsMain;
function init(alarmsCollection) {
    alarmsMain = alarmsCollection;
}

const modalWindow = document.getElementById("modal-window");

document.getElementById("ul--alarm-list").addEventListener("click", (e) => {
    const uuidToOperate = e.target.closest(".li-alarm").dataset.uuid;
    if (e.target.matches(".eh-delete")) {
        showConfirmDeleteModal(uuidToOperate);
    } else if (e.target.matches(".eh-edit")) {
        showEditModal(uuidToOperate);
    }
    Views.generateViews(alarmsMain);
});

/*******
 * DELETE-Related:
 *******/
let deleteAbortController;

const modalConfirmDeleteBox = document.getElementById(
    "modal-window-confirm--container"
);
const btnConfirmDeleteOK = document.getElementById("modal-window-confirm--yes");
// ON CANCEL Btn pressed:
const btnConfirmDeleteCancel = document.getElementById(
    "modal-window-confirm--cancel"
);
btnConfirmDeleteCancel.addEventListener("click", hideConfirmDeleteModal);

function showConfirmDeleteModal(uuidToDelete) {
    setupConfirmDeleteModal(uuidToDelete);
    modalWindow.style.display = "block";
    modalConfirmDeleteBox.style.display = "block";
}

function hideConfirmDeleteModal() {
    deleteAbortController.abort();
    modalConfirmDeleteBox.style.display = "none";
    modalWindow.style.display = "none";
}

function setupConfirmDeleteModal(uuidToDelete) {
    deleteAbortController = new AbortController();
    btnConfirmDeleteOK.addEventListener(
        "click",
        () => {
            alarmsMain.deleteAlarm(uuidToDelete);
            Views.generateViews(alarmsMain);
            hideConfirmDeleteModal();
        },
        { once: true, signal: deleteAbortController.signal }
    );
}

/*******
 * Edit-Related:
 *******/
const modalEditAlarm = document.getElementById("modal-window-edit--container");
const btnOKEditModal = document.getElementById("btn-modal-edit--yes");
const btnCancelEditModal = document.getElementById("btn-modal-edit--cancel");

let editAbortController;

btnCancelEditModal.addEventListener("click", hideEditModal);

function showEditModal(uuidToEdit) {
    setupEditModal(uuidToEdit);
    modalWindow.style.display = "block";
    modalEditAlarm.style.display = "block";
}

function hideEditModal() {
    editAbortController.abort();
    modalEditAlarm.style.display = "none";
    modalWindow.style.display = "none";
}

function setupEditModal(uuidToEdit) {
    const alarmPresentAlready = alarmsMain.getAlarm(uuidToEdit);
    // Set up the field values as per the alarm:
    document.getElementById("modal--alarm-edit--name").value =
        alarmPresentAlready.name;

    const earlierAlarmTime = new Date(alarmPresentAlready.alarmTime);
    earlierAlarmTime.setMinutes(
        alarmPresentAlready.alarmTime.getMinutes() -
            alarmPresentAlready.alarmTime.getTimezoneOffset()
    );
    const timeStr = earlierAlarmTime.toISOString().slice(0, 19);

    document.getElementById("modal--alarm-edit--time").value = timeStr;
    document.getElementById("modal--alarm-edit--uuid").innerText =
        alarmPresentAlready.uuid;

    editAbortController = new AbortController();

    btnOKEditModal.addEventListener(
        "click",
        () => {
            onBtnOKEditModalPressedCallback(uuidToEdit);
        },
        { once: true, signal: editAbortController.signal }
    );
}

function onBtnOKEditModalPressedCallback(uuidToEdit) {
    const alarmUpdateObject = getFormValues(uuidToEdit);
    alarmsMain.editAlarm(alarmUpdateObject);
    Views.generateViews(alarmsMain);
    hideEditModal();
}

function getFormValues(uuidToEdit) {
    return {
        name: document.getElementById("modal--alarm-edit--name").value,
        alarmTime: new Date(
            Date.parse(document.getElementById("modal--alarm-edit--time").value)
        ),
        uuid: uuidToEdit,
    };
}

const dateTimeInputEditModal = document.getElementById(
    "modal--alarm-edit--time"
);

dateTimeInputEditModal.addEventListener(
    "change",
    onEditAlarmInputDateTimeChange
);

const errorMsgEditModal = document.getElementById(
    "modal--alarm-edit--error-message"
);

function onEditAlarmInputDateTimeChange() {
    if (Date.now() > Date.parse(dateTimeInputEditModal.value)) {
        errorMsgEditModal.innerText =
            "Wrong. Past date, can't choose that as alarm!";
        errorMsgEditModal.classList.add("invalid-alarmTime");
    } else {
        errorMsgEditModal.classList.remove("invalid-alarmTime");
        errorMsgEditModal.innerText = "OK.";
    }
}

/*******
 * Alarm-Arrived-Related:
 *******/
const modalAlarmsArrived = document.getElementById(
    "modal-window-alarm-arrived--container"
);
modalAlarmsArrived.addEventListener("click", handleAlarmArrivedBtnEvents);

function handleAlarmArrivedBtnEvents(e) {
    const uuidToDelete = e.target.closest(".li--alarm-arrived").dataset.uuid;
    if (e.target.matches(".eh--arrived-delete")) {
        showConfirmDeleteModal(uuidToDelete);
    } else if (e.target.matches(".eh--arrived-edit")) {
        showEditModal(uuidToDelete);
    } else if (e.target.matches(".reactivate-alarm")) {
        console.log("Missing Action for Reactivate Alarm");
    } else if (e.target.matches(".disable-alarm")) {
        console.log("Missing Action for Disable Alarm");
    }
    Views.generateViews(alarmsMain);
}

export { init };
