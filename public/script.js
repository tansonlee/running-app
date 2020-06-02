// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

// define variables that reference elements on our page
const dreamsList = document.getElementById("dreams");
const dreamsForm = document.querySelector("form");

// a helper function that creates a list item for a given dream
function appendNewDream(dream) {
	const newListItem = document.createElement("li");
	newListItem.innerText = dream;
	dreamsList.appendChild(newListItem);
}

// fetch the initial list of dreams
fetch("/dreams")
	.then((response) => response.json()) // parse the JSON from the server
	.then((dreams) => {
		// remove the loading text
		dreamsList.firstElementChild.remove();

		// iterate through every dream and add it to our page
		dreams.forEach(appendNewDream);

		// listen for the form to be submitted and add a new dream when it is
		dreamsForm.addEventListener("submit", async (event) => {
			// stop our form submission from refreshing the page
			event.preventDefault();

			// get dream value and add it to the list
			let newDream = dreamsForm.elements.dream.value;
			dreams.push(newDream);
			appendNewDream(newDream);

			// send new dream to server
			const data = { newDream };
			console.log(data);

			// fetch the post (1)
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			};

			const response = await fetch("/dream", options);
			const responseJSON = await response.json();
			await console.log(responseJSON);

			// reset form
			dreamsForm.reset();
			dreamsForm.elements.dream.focus();
		});
	});
