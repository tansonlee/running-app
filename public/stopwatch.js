class Stopwatch {
	constructor() {
		this.startTime;
		this.interval;
	}

	// returns an array [hour, minute, second]
	returnTime() {
		let t = new Date().getTime();
		let millisecondsPassed = t - this.startTime;
		let hours = Math.floor((millisecondsPassed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((millisecondsPassed % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((millisecondsPassed % (1000 * 60)) / 1000);

		if (hours < 10) {
			hours = `0${hours.toString()}`;
		}

		if (minutes < 10) {
			minutes = `0${minutes.toString()}`;
		}

		if (seconds < 10) {
			seconds = `0${seconds.toString()}`;
		}

		hours = hours.toString();
		minutes = minutes.toString();
		seconds = seconds.toString();

		return { hours, minutes, seconds };
	}

	start() {
		this.reset();
		this.startTime = new Date().getTime();
		this.interval = setInterval(() => {
			this.updateDiv();
		}, 1000);
	}

	stop() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	reset() {
		this.startTime = null;
		if (this.interval) {
			clearInterval(this.interval);
		}
		const hour = document.getElementById("hour");
		const minute = document.getElementById("minute");
		const second = document.getElementById("second");

		hour.textContent = "00";
		minute.textContent = "00";
		second.textContent = "00";
	}

	updateDiv() {
		const hour = document.getElementById("hour");
		const minute = document.getElementById("minute");
		const second = document.getElementById("second");

		const time = this.returnTime();
		hour.textContent = time.hours;
		minute.textContent = time.minutes;
		second.textContent = time.seconds;
	}
}
