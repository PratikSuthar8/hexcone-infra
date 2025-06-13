// Set your launch date and time
const launchDate = new Date("2025-07-01T00:00:00").getTime();

const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
	const now = new Date().getTime();
	const distance = launchDate - now;

	if (distance < 0) {
		document.getElementById("countdown").innerHTML = "We're Live!";
		return;
	}

	const totalSeconds = Math.floor(distance / 1000);
	const hours = Math.floor((totalSeconds / 60 / 60) % 24);
	const minutes = Math.floor((totalSeconds / 60) % 60);
	const seconds = totalSeconds % 60;

	hoursEl.textContent = String(hours).padStart(2, "0");
	minutesEl.textContent = String(minutes).padStart(2, "0");
	secondsEl.textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();
