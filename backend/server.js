var express = require("express");
var path = require("path");
var tableArray = require("data/table.js")
var waitingArray = require("data/waiting.js")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "index.html"));
});

// Displays all characters
app.get("/api/tables", function(req, res) {
  return res.json(tableArray);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitingArray);
  });

// Displays a single character, or returns false
// app.get("/api/characters/:character", function(req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });

// Create New Characters - takes in JSON input
app.post("/api/table", function(req, res){
    if(tableArray.length < 5){
        tableArray.push(req.body);
        return res.json(true);
    } else {
    waitingArray.push(req.body);
    return res.json(false);
    }
    }); 

app.post("/api/clear", function(req, res){
    tableArray = [];
    waitingArray = [];
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});