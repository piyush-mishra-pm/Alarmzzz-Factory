import * as View from "./Views.js";

const modalWindow = document.getElementById("modal-window");

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

function showConfirmDeleteModal(uuidToDelete, alarmList) {
    setupConfirmDeleteModal(uuidToDelete, alarmList);
    modalWindow.style.display = "block";
    modalConfirmDeleteBox.style.display = "block";
}

function hideConfirmDeleteModal() {
    deleteAbortController.abort();
    modalConfirmDeleteBox.style.display = "none";
    modalWindow.style.display = "none";
}

function setupConfirmDeleteModal(uuidToDelete, alarmsPresent) {
    deleteAbortController = new AbortController();
    btnConfirmDeleteOK.addEventListener(
        "click",
        () => {
            alarmsPresent.deleteAlarm(uuidToDelete);
            View.generateViewAlarmList(alarmsPresent.alarmList);
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

function showEditModal(uuidToEdit, alarmsPresent) {
    setupEditModal(uuidToEdit, alarmsPresent);
    modalWindow.style.display = "block";
    modalEditAlarm.style.display = "block";
}

function hideEditModal() {
    editAbortController.abort();
    modalEditAlarm.style.display = "none";
    modalWindow.style.display = "none";
}

function setupEditModal(uuidToEdit, alarmsPresent) {
    // Get the alarm details stored:
    console.log(uuidToEdit);
    const alarmPresentAlready = alarmsPresent.getAlarm(uuidToEdit);
    console.log(alarmPresentAlready);
    // Set up the field values as per the alarm:
    document.getElementById("modal--alarm-edit--name").value =
        alarmPresentAlready.name;

    const earlierAlarmTime = new Date(alarmPresentAlready.alarmTime);
    earlierAlarmTime.setMinutes(
        alarmPresentAlready.alarmTime.getMinutes() -
            alarmPresentAlready.alarmTime.getTimezoneOffset()
    );
    const timeStr = earlierAlarmTime.toISOString().slice(0, 19);
    console.log(timeStr);
    document.getElementById("modal--alarm-edit--time").value = timeStr;
    document.getElementById("modal--alarm-edit--uuid").innerText =
        alarmPresentAlready.uuid;

    editAbortController = new AbortController();

    btnOKEditModal.addEventListener(
        "click",
        () => {
            onBtnOKEditModalPressedCallback(uuidToEdit, alarmsPresent);
        },
        { once: true, signal: editAbortController.signal }
    );
}

function onBtnOKEditModalPressedCallback(uuidToEdit, alarmsPresent) {
    const alarmUpdateObject = getFormValues(uuidToEdit);
    alarmsPresent.editAlarm(alarmUpdateObject);
    View.generateViewAlarmList(alarmsPresent.alarmList);
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

export { showConfirmDeleteModal, showEditModal };
