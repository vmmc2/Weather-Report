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
app.use(express.static(__dirname + "/public"));

//Routes
app.get("/", function(req, res){
    res.render("home");
});

app.get("/city", function(req, res){
    res.render("city");
});

app.post("/city", function(req, res){
    const city = req.body.city;
    const temperatureMode = req.body.units;
    const temperatureUnit = temperatureMode === "metric" ? "°C" : "°F";
    
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

                    const weatherReport = {
                        "cityName" : city,
                        "countryName" : weatherData["sys"]["country"],
                        "currentTemp" : weatherData["main"]["temp"],
                        "feelsLike" : weatherData["main"]["feels_like"],
                        "minTemp" : weatherData["main"]["temp_min"],
                        "maxTemp" : weatherData["main"]["temp_max"],
                        "tempUnit" : temperatureUnit,
                        "humidity" : weatherData["main"]["humidity"],
                        "weatherIcon" : weatherData["weather"][0]["icon"],
                        "weatherDescription" : weatherData["weather"][0]["main"]
                    };

                    res.render("city", weatherReport);
                });
            });

        });
    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});