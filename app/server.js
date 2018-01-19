// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var colors = require("colors");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static('app/public'));
app.use(express.static('app/assets'));

//  (DATA)
// =============================================================


// Routes
// =============================================================
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);



// Create New Characters - takes in JSON input


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log(colors.inverse.green("App listening on PORT " + PORT));
});
