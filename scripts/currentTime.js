// Caching DOM reference:
const currentTimeDisplay = document.getElementById("current-time-text");

function setCurrentTime() {
  const currentTime = new Date();
  const formattedTime = timeFormatter(currentTime);
  currentTimeDisplay.innerText = formattedTime;
}

function timeFormatter(timeGiven) {
  return (
    String(timeGiven.getHours()).padStart(2, "0") +
    ":" +
    String(timeGiven.getMinutes()).padStart(2, "0") +
    ":" +
    String(timeGiven.getSeconds()).padStart(2, "0")
  );
}

setInterval(setCurrentTime, 1000);
