require("dotenv").config()
const ejs = require("ejs");
const _ = require("lodash");
const http = require("http");
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
    const city = req.body.city;
    const temperatureMode = req.body.units;
    
    const geocoderUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    http.get(geocoderUrl, function(response){
        if(response.statusCode !== 200){
            res.redirect("/");
        }
        response.on("data", function(data){
            const geocoderData = JSON.parse(data);
            const latitude = geocoderData[0]["lat"];
            const longitude = geocoderData[0]["lon"];

            const owmUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${temperatureMode}&appid=${apiKey}`;
            http.get(owmUrl, function(response){
                if(response.statusCode !== 200){
                    res.redirect("/");
                }
                response.on("data", function(data){
                    const weatherData = JSON.parse(data);
                    console.log(weatherData);

                    const cityName = weatherData["name"];
                    const countryName = weatherData["sys"]["country"];
                    const currentTemp = weatherData["main"]["temp"];
                    const feelsLike = weather["main"]["feels_like"];
                    const minTemp = weatherData["main"]["temp_min"];
                    const maxTemp = weatherData["main"]["temp_max"];
                    const humidity = weatherData["main"]["humidity"];
                    const weatherIcon = weatherData["weather"][0]["icon"];
                    const weatherDescription = weatherData["weather"][0]["main"];
                });
            });

        });
    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});