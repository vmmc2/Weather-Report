require("dotenv").config()
const ejs = require("ejs");
const _ = require("lodash");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const apiKey = process.env.apikey;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Routes
app.get("/", function(req, res){
    res.render("home");
});

app.get("/city", function(req, res){
    res.render("city.ejs");
});

app.post("/city", function(req, res){
    const numDays = 7;
    const city = req.body.city;
    const temperatureMode = req.body.units;

    console.log(apiKey);

});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});