import * as Views from "./Views.js";
import * as Utils from "./Utils.js";
import * as PersistenceManager from "./PersistenceManager.js";

let alarmsMain;
function init(alarmsCollection) {
    alarmsMain = alarmsCollection;
}

const modalWindow = document.getElementById("modal-window");
attachAlarmEventListeners();

function attachAlarmEventListeners() {
    // delete event listeners:
    const deleteListeners = document.querySelectorAll(".listener-delete");
    deleteListeners.forEach((deleteListener) => {
        deleteListener.addEventListener("click", (e) => {
            if (e.target.matches(".btn--delete-alarm")) {
                const uuidToOperate = e.target.closest(".li--alarm").dataset.uuid;
                showConfirmDeleteModal(uuidToOperate);
            }
        });
    });

    // edit event listeners:
    document.querySelectorAll(".listener-edit").forEach((editListener) =>
        editListener.addEventListener("click", (e) => {
            const uuidToOperate = e.target.closest(".li--alarm").dataset.uuid;
            if (e.target.matches(".btn--edit-alarm")) {
                showEditModal(uuidToOperate);
            }
        })
    );

    // toggle-disable-alarm event listeners:
    document.querySelectorAll(".listener-disable").forEach((disableListener) =>
        disableListener.addEventListener("click", (e) => {
            const uuidToOperate = e.target.closest(".li--alarm").dataset.uuid;
            if (e.target.matches(".btn-toggle-disable")) {
                toggleDisableAction(uuidToOperate);
            }
        })
    );
}

/*******
 * DELETE-Related:
 *******/
let deleteAbortController;

const modalConfirmDeleteBox = document.getElementById("modal-window-confirm-delete--container");
const btnConfirmDeleteOK = document.getElementById("modal-window-confirm-delete--yes");
// ON CANCEL Btn pressed:
const btnConfirmDeleteCancel = document.getElementById("modal-window-confirm-delete--cancel");
btnConfirmDeleteCancel.addEventListener("click", hideConfirmDeleteModal);

function showConfirmDeleteModal(uuidToDelete) {
    setupConfirmDeleteModal(uuidToDelete);
    modalWindow.style.display = "block";
    modalConfirmDeleteBox.style.display = "block";
}

function setupConfirmDeleteModal(uuidToDelete) {
    deleteAbortController = new AbortController();
    btnConfirmDeleteOK.addEventListener(
        "click",
        () => {
            alarmsMain.deleteAlarm(uuidToDelete);
            Views.generateViews(alarmsMain);
            PersistenceManager.SaveData(alarmsMain);
            hideConfirmDeleteModal();
        },
        { once: true, signal: deleteAbortController.signal }
    );
}

function hideConfirmDeleteModal() {
    deleteAbortController.abort();
    modalConfirmDeleteBox.style.display = "none";
    modalWindow.style.display = "none";
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
    // name
    document.getElementById("modal--alarm-edit--name").value = alarmPresentAlready.name;
    // alarm time:
    document.getElementById("modal--alarm-edit--time").value = Utils.getISODateStringFromDate(
        alarmPresentAlready.alarmTime
    );

    // uuid:
    document.getElementById("modal--alarm-edit--uuid").innerText = alarmPresentAlready.uuid;
    // disabled status:
    const btnActivate = document.getElementById("modal--alarm-edit--disabled");
    btnActivate.checked = alarmPresentAlready.getDisabledStatus();

    // Update error msg and OK button visibility, based on filled data:
    isEditAlarrmInputValid();

    // Attach Event listener to OK button.
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
    if (!isEditAlarrmInputValid()) return;
    alarmsMain.editAlarm(alarmUpdateObject);
    Views.generateViews(alarmsMain);
    PersistenceManager.SaveData(alarmsMain);
    hideEditModal();
}

function getFormValues(uuidToEdit) {
    return {
        name: document.getElementById("modal--alarm-edit--name").value,
        alarmTime: new Date(Date.parse(document.getElementById("modal--alarm-edit--time").value)),
        uuid: uuidToEdit,
        disabled: document.getElementById("modal--alarm-edit--disabled").checked,
    };
}

const dateTimeInputEditModal = document.getElementById("modal--alarm-edit--time");

dateTimeInputEditModal.addEventListener("change", isEditAlarrmInputValid);

const errorMsgEditModal = document.getElementById("modal--alarm-edit--error-message");

function isEditAlarrmInputValid() {
    if (Date.now() > Date.parse(dateTimeInputEditModal.value)) {
        errorMsgEditModal.innerText = "Wrong. Past date, can't choose that as alarm!";
        errorMsgEditModal.classList.add("invalid-alarmTime");
        btnOKEditModal.disabled = true;
        return false;
    } else {
        errorMsgEditModal.classList.remove("invalid-alarmTime");
        errorMsgEditModal.innerText = "OK.";
        btnOKEditModal.disabled = false;
        return true;
    }
}

/*******
 * Toggle-Disable-Alarm:
 *******/
function toggleDisableAction(uuid) {
    const alarmToToggle = alarmsMain.getAlarm(uuid);
    if (!alarmToToggle) return;
    alarmToToggle.toggleDisabledStatus();
    alarmsMain.updateAlarmsFinishedStatus();
    Views.generateViews(alarmsMain);
    PersistenceManager.SaveData(alarmsMain);
}

export { init };
