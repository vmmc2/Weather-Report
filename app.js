const ejs = require("ejs");
const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({exntended: true}));
app.set("view engine", "ejs");

//Routes
app.get("/", function(req, res){
    res.render("home");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});