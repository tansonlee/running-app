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

db.insert(
	{
		name: "tanson",
		food: "apple"
	},
	(err, newDoc) => {
		if (err) {
			console.log(err);
		}
		console.log(newDoc);
	}
);
db.find({}, function(err, users) {
	// Find all users in the collection
	console.log(users);
});

// our default array of dreams
const dreams = [ "Find and count some sheep", "Climb a really tall mountain", "Wash the dishes" ];

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
	response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
	// express helps us take JS objects and send them as JSON
	response.json(dreams);
});

// listen for requests :)
const port = 8000;
const listener = app.listen(port, () => {
	console.log("Your app is listening on port " + listener.address().port);
});

app.post("/dream", function(request, response) {
	const data = { status: "success", dream: request.body.newDream };

	response.json(data);
	db.insert({ dream: request.body.newDream });
});
