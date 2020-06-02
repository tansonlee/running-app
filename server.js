// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const Datastore = require("nedb");
const db = new Datastore({ filename: "database.db", autoload: true });
db.loadDatabase();

// our default array of dreams
const dreams = [ "Find and count some sheep", "Climb a really tall mountain", "Wash the dishes" ];

dreams.forEach((dream) => {
	db.insert({ dream: dream });
});

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
	response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to webpage
app.get("/dreams", (request, response) => {
	// express helps us take JS objects and send them as JSON
	response.json(dreams);
});

// send all the data from the database to webpage
app.get("/data", (request, response) => {
	db.find({}, (err, data) => {
		if (err) {
			response.end();
			return;
		}
		response.json({ data });
	});
});

// listen for requests :)
const port = 8000;
const listener = app.listen(port, () => {
	console.log("Your app is listening on port " + listener.address().port);
});

// receive the added dream from webpage
app.post("/dream", function(request, response) {
	const data = { status: "success", dream: request.body.newDream };

	response.json(data);
	db.insert({ dream: request.body.newDream });
});
