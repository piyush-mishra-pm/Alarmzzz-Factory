function timeFormatter(timeGiven) {
    return (
        String(timeGiven.getHours()).padStart(2, "0") +
        ":" +
        String(timeGiven.getMinutes()).padStart(2, "0") +
        ":" +
        String(timeGiven.getSeconds()).padStart(2, "0")
    );
}

function getDuration(duration) {
    let durationString = "";
    const MS_IN_DAY = 3600 * 1000 * 24;
    if (duration > MS_IN_DAY) {
        durationString += `${Math.floor(duration / MS_IN_DAY)}d - `;
    }
    // fractions of a day left:
    duration %= MS_IN_DAY;
    durationString += String(duration % 3600000).padStart(2, "0");

    // fractions of minute left:
    duration %= 3600000;
    durationString += String(duration % 60000).padStart(2, "0");

    // fractions of seconds left:
    duration %= 60000;
    durationString += String(duration % 1000).padStart(2, "0");

    return durationString;
}

function getISODateStringFromDate(dateISOstring) {
    const dateClone = new Date(dateISOstring);
    dateClone.setMinutes(dateClone.getMinutes() - dateClone.getTimezoneOffset());
    return dateClone.toISOString().slice(0, 19);
}

export { timeFormatter, getISODateStringFromDate, getDuration };
