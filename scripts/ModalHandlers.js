import * as View from "./Views.js";

const modalWindow = document.getElementById("modal-window");
const modalConfirmDeleteBox = document.getElementById(
    "modal-window-confirm--container"
);
const btnConfirmDeleteOK = document.getElementById("modal-window-confirm--yes");

// ON CANCEL Btn pressed:
const btnConfirmDeleteCancel = document.getElementById(
    "modal-window-confirm--cancel"
);
btnConfirmDeleteCancel.addEventListener(
    "click",
    onConfirmDeleteModalCancelBtnPressed
);

function onConfirmDeleteModalCancelBtnPressed() {
    tearDownConfirmDeleteModal();
    hideConfirmDeleteModal();
}

/*******
 * DELETE:
 *******/

function showConfirmDeleteModal(uuidToDelete, alarmList) {
    setupConfirmDeleteModal(uuidToDelete, alarmList);
    modalWindow.style.display = "block";
    modalConfirmDeleteBox.style.display = "block";
}

function hideConfirmDeleteModal() {
    tearDownConfirmDeleteModal();
    modalConfirmDeleteBox.style.display = "none";
    modalWindow.style.display = "none";
}

function setupConfirmDeleteModal(uuidToDelete, alarmsPresent) {
    btnConfirmDeleteOK.addEventListener("click", () => {
        alarmsPresent.deleteAlarm(uuidToDelete);
        onConfirmDeleteModalCancelBtnPressed();
        View.generateViewAlarmList(alarmsPresent.alarmList);
    });
}

function tearDownConfirmDeleteModal() {
    modalWindow.dataset.uuid = "";
}

export { showConfirmDeleteModal, hideConfirmDeleteModal };
