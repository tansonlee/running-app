// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");
let start = false;

// // define variables that reference elements on our page
// const dreamsList = document.getElementById("dreams");
// const dreamsForm = document.querySelector("form");
const status_div = document.getElementById("status");
const start_div = document.getElementById("start");
const stop_div = document.getElementById("stop");
const delete_div = document.getElementById("delete");
const distance_span = document.getElementById("distance");

// given the lat lon of two pts, returns the distance between in METERS
function distance(lat1, lon1, lat2, lon2) {
	// generally used geo measurement function
	const R = 6378.137; // Radius of earth in KM
	const dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
	const dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c;
	return d * 1000; // meters
}

// // a helper function that creates a list item for a given dream
// function appendNewDream(dream) {
// 	const newListItem = document.createElement("li");
// 	newListItem.innerText = dream;
// 	dreamsList.appendChild(newListItem);
// }

// // fetch the initial list of dreams
// fetch("/dreams")
// 	.then((response) => response.json()) // parse the JSON from the server
// 	.then((dreams) => {
// 		// remove the loading text
// 		dreamsList.firstElementChild.remove();

// 		// iterate through every dream and add it to our page
// 		dreams.forEach(appendNewDream);

// 		// listen for the form to be submitted and add a new dream when it is
// 		dreamsForm.addEventListener("submit", async (event) => {
// 			// stop our form submission from refreshing the page
// 			event.preventDefault();

// 			// get dream value and add it to the list
// 			let newDream = dreamsForm.elements.dream.value;
// 			dreams.push(newDream);
// 			appendNewDream(newDream);

// 			// send new dream to server
// 			const data = { newDream };
// 			console.log(data);

// 			// fetch the post (1)
// 			const options = {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json"
// 				},
// 				body: JSON.stringify(data)
// 			};

// 			// send the added dream to server
// 			const response = await fetch("/dream", options);
// 			const responseJSON = await response.json();
// 			console.log(responseJSON);

// 			// reset form
// 			dreamsForm.reset();
// 			dreamsForm.elements.dream.focus();

// 			getData();
// 		});
// 	});

// async function main() {
// 	const data = await getData();
// 	const dataArray = data.data;
// 	dataArray.forEach((element) => {
// 		const root = document.createElement("div");
// 		root.setAttribute("class", "data-pack");
// 		const food = document.createElement("div");
// 		const location = document.createElement("div");
// 		const date = document.createElement("div");

// 		food.textContent = `food: ${element.food}`;
// 		location.textContent = `${parseFloat(element.lat).toFixed(2)}°, ${parseFloat(element.lon).toFixed(2)}°`;
// 		const dateString = new Date(element.date).toLocaleString();
// 		date.textContent = dateString;

// 		root.append(food, location, date);
// 		document.body.append(root);
// 	});
// }

// async function getData() {
// 	const response = await fetch("/data");
// 	const responseJSON = await response.json();
// 	return responseJSON;
// }

// finds the location then sends it to the server
// function logLocation() {
// 	if ("geolocation" in navigator) {
// 		gpsStatus_div.textContent = "GPS Availible";
// 		navigator.geolocation.getCurrentPosition(async (position) => {
// 			lat = position.coords.latitude;
// 			lon = position.coords.longitude;
// 			const date = new Date();

// 			const data = { lat, lon, date };

// 			console.log(data);

// 			const options = {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json"
// 				},
// 				body: JSON.stringify(data)
// 			};

// 			// send the added dream to server
// 			const response = await fetch("/location", options);
// 			const responseJSON = await response.json();
// 		});
// 	} else {
// 		gpsStatus_div.textContent = "GPS NOT Availible";
// 		console.log("cannot determine location");
// 		/* geolocation IS NOT available */
// 	}
// }

async function logDistance(distance) {
	const date = new Date();
	const data = { distance, date };
	console.log(data);

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	};

	// send the added dream to server
	const response = await fetch("/distance", options);
	const responseJSON = await response.json();
	console.log(responseJSON);
}

let lat;
let lon;
let data;
function giveLocation() {
	navigator.geolocation.getCurrentPosition((position) => {
		lat = position.coords.latitude;
		lon = position.coords.longitude;
		data = { lat, lon };
	});
	if (data) {
		return data;
	}
}

let totalDistance = 0;
// starts logging location when clicked
start_div.addEventListener("click", () => {
	start = true;
	let currentPosition = giveLocation();
	let previousPosition;
	setInterval(() => {
		if (start) {
			previousPosition = currentPosition;
			currentPosition = giveLocation();
			if (previousPosition && currentPosition) {
				const distanceInterval = distance(
					previousPosition.lat,
					previousPosition.lon,
					currentPosition.lat,
					currentPosition.lon
				);
				totalDistance += distanceInterval;
				console.log(distanceInterval);
			}
			distance_span.textContent = parseInt(totalDistance);
		}
	}, 6000);
});

// stops logging location when clicked
stop_div.addEventListener("click", () => {
	start = false;
	console.log(totalDistance);
	logDistance(totalDistance);
});

// sends a request to server to delete database
delete_div.addEventListener("click", async () => {
	const data = { toDo: "delete" };

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	};

	// send the added dream to server
	const response = await fetch("/delete", options);
	const responseJSON = await response.json();
	console.log(responseJSON);
});

// send location to server
// async function sendLocation(lat, lon) {}

// determineLocation();

// setInterval(() => {
// 	tempLat = lat;
// 	tempLon = lon;
// 	sendLocation(tempLat, tempLon);
// }, 3000);
