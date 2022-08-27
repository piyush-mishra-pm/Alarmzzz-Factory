function timeFormatter(timeGiven) {
    return (
        String(timeGiven.getHours()).padStart(2, "0") +
        ":" +
        String(timeGiven.getMinutes()).padStart(2, "0") +
        ":" +
        String(timeGiven.getSeconds()).padStart(2, "0")
    );
}

function timeFormatter_DYM(timeGiven) {
    return String(timeGiven.getDate()) + "/" + String(timeGiven.getMonth()) + "/" + String(timeGiven.getFullYear());
}

function getDuration(duration) {
    let durationString = "";
    // yrs left: (Optional)
    const MS_IN_YEAR = 3600 * 1000 * 24 * 365;
    if (duration > MS_IN_YEAR) {
        durationString += `${Math.floor(duration / MS_IN_YEAR)}y-`;
        duration %= MS_IN_YEAR;
    }

    //days left:(Optional)
    const MS_IN_DAY = 3600 * 1000 * 24;
    if (duration > MS_IN_DAY) {
        durationString += `${Math.floor(duration / MS_IN_DAY)}d-`;
        duration %= MS_IN_DAY;
    }

    // hours left:
    durationString += String(Math.floor(duration / 3600000)).padStart(2, "0") + ":";
    duration %= 3600000;

    // minutes left:
    durationString += String(Math.floor(duration / 60000)).padStart(2, "0") + ":";
    duration %= 60000;

    // seconds left:
    durationString += String(Math.floor(duration / 1000)).padStart(2, "0");

    return durationString;
}

function getISODateStringFromDate(dateTime) {
    const dateClone = new Date(dateTime);
    dateClone.setMinutes(dateClone.getMinutes() - dateClone.getTimezoneOffset());
    return dateClone.toISOString().slice(0, 19);
}

export { timeFormatter, timeFormatter_DYM, getISODateStringFromDate, getDuration };
