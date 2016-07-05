var mongoose = require("mongoose");
var express = require("express");
var chalk = require("chalk");

mongoose.connect("mongodb://localhost/blah");

var Booking = mongoose.model("Booking", {people: Number, time: Date});

// console.log("Hello");

// console.log(chalk.white.bgBlue("Hellow world"));


var app = express();

app.set("view engine", "ejs");

app.get("/", function (request, response) {
	Booking.find(function (error, results) {
	response.render("Home", {bookings: results});
	});
});

app.get("/bookings/new", function (request, response){
	response.render("bookings/new");
});

app.post("/bookings", function (request, response){
	var theBooking = new Booking({ people: 5, time: new Date(2016, 7, 6)});
	theBooking.save(function(err){
		if(err){
			throw err;
		}else{
			response.redirect("/");
		}
	});
});

app.listen(3000);

console.log("listening");
