console.log("hello");
// shows the data as divs
async function showData() {
	const data = await getData();
	const dataArray = data.data;
	console.log(dataArray);
	dataArray.forEach((element) => {
		const root = document.createElement("div");
		root.setAttribute("class", "data-pack");
		const distance_div = document.createElement("div");
		const time_div = document.createElement("div");
		const date_div = document.createElement("div");

		distance_div.textContent = `Total Distance: ${parseInt(element.distance)}m`;
		time_div.textContent = `Total Time: ${element.time}`;
		date_div.textContent = `Date: ${element.date}`;

		root.append(distance_div, time_div, date_div);
		document.body.append(root);
	});
}

// receive data from database
async function getData() {
	const response = await fetch("/data");
	const responseJSON = await response.json();
	return responseJSON;
}

showData();
