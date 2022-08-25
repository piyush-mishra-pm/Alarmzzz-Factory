function timeFormatter(timeGiven) {
    return (
        String(timeGiven.getHours()).padStart(2, "0") +
        ":" +
        String(timeGiven.getMinutes()).padStart(2, "0") +
        ":" +
        String(timeGiven.getSeconds()).padStart(2, "0")
    );
}

function getISODateStringFromDate(dateISOstring) {
    const dateClone = new Date(dateISOstring);
    dateClone.setMinutes(dateClone.getMinutes() - dateClone.getTimezoneOffset());
    return dateClone.toISOString().slice(0, 19);
}

export { timeFormatter, getISODateStringFromDate };
