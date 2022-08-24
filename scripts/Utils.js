function timeFormatter(timeGiven) {
    return (
        String(timeGiven.getHours()).padStart(2, "0") +
        ":" +
        String(timeGiven.getMinutes()).padStart(2, "0") +
        ":" +
        String(timeGiven.getSeconds()).padStart(2, "0")
    );
}

export { timeFormatter };
