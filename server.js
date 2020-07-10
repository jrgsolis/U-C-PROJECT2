// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =============================================================
var listings = [
  {
    Title: "smash",
    name: "Super Smash Bros. Ultimate",
    condition: "New",
    description: "Game works perfectly fine, box has no manual",
    price: 35
  },
  {
    Title: "halo",
    name: "Halo 3",
    condition: "Used",
    description: "Game works fine, box has no manual and disc is a bit scratched",
    price: 10
  },
  {
    Title: "cod",
    name: "Call Of Duty: Modern Warfare",
    condition: "New",
    description: "Literally just bought it, just dont have time to play it",
    price: 50
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all listings
app.get("/api/listings", function(req, res) {
  return res.json(listings);
});

// Displays a single character, or returns false
app.get("/api/listings/:listing", function(req, res) {
  var chosen = req.params.listing;

  console.log(chosen);

  for (var i = 0; i < listings.length; i++) {
    if (chosen === listings[i].Title) {
      return res.json(listings[i]);
    }
  }

  return res.json(false);
});

app.post("/api/listings", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newListing = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newListing.Title = newListing.name.replace(/\s+/g, "").toLowerCase();

  console.log(newListing);

  listings.push(newListing);

  res.json(newListing);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
