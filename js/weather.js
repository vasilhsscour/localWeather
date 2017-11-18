$(document).ready(function() {
    // take the position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lon = position.coords.longitude;
            var lat = position.coords.latitude;
            getInformations(lon, lat);
        })
    } else {
        alert("Unable to take the location");
    }

    // if the button for celsius if pressed
    $("#cel").click(function() {
        if (!$(this).hasClass("disabled")) {
            $("#fahr").removeClass("disabled");
            $(this).addClass("disabled");
            $("#fc").text("C");
            var ftmp = $("#temp").text();
            var ctmp = toCelsius(ftmp);
            var min = toCelsius($("#min").text());
            var max = toCelsius($("#max").text());
            $("#temp").text(ctmp);
            $("#min").text(min);
            $("#max").text(max);
        }
    });

    // if the button for fahrenheit pressed
    $("#fahr").click(function() {
        if (!$(this).hasClass("disabled")) {
            $("#cel").removeClass("disabled");
            $(this).addClass("disabled");
            $("#fc").text("F");
            var ctmp = $("#temp").text();
            var ftmp = toFahrenheit(ctmp);
            var min = toFahrenheit($("#min").text());
            var max = toFahrenheit($("#max").text());
            $("#temp").text(ftmp);
            $("#min").text(min);
            $("#max").text(max);
        }
    });
});

// get the informations of the api
function getInformations(lon, lat) {
    // connect to the api
    var apiUrl = "https://fcc-weather-api.glitch.me/api/current?" + "lon=" + lon + "&lat=" + lat;
    $.ajax({
        url: apiUrl,
        success: function(result) {
            //take the results from the json
            var city = result.name + ", " + result.sys.country;
            var temp = Math.round(result.main.temp);
            var humidity = result.main.humidity
            var minTemp = result.main.temp_min;
            var maxTemp = result.main.temp_max;
            var windSpeed = Math.round(result.wind.speed);
            var windDeg = result.wind.deg;
            var clouds = result.clouds.all;
            var weather = result.weather[0].main.toLowerCase();
            var weatherDes = result.weather[0].description;
            var img = result.weather[0].icon;

            // add the results to the box
            $("#country").text(city);
            $("#temp").text(temp);
            $("#weather").text(weatherDes + " " + clouds);
            var w = wind(windDeg, windSpeed);
            $("#wind").text(w);
            $("#min").text(minTemp + "");
            $("#max").text(maxTemp + "");
            $("#humidity").text(humidity);
            $("#weatherImg").attr("src", img);
            //change the background image
            $("body").css({
                backgroundImage: "url(" + weatherImages[weather] + ")",
                backgroundPosition: "center center",
                backgroundRepeat: "no - repeat",
                backgroundAttachment: "fixed",
                webkitBackgroundSize: "cover",
                mozBackgroundSize: "cover",
                oBackgroundSize: "cover",
                backgroundSize: "cover"
            });
        }
    });
}

// take the degrees and the speed of the wind
// return the winds direction and the description for the speed
function wind(deg, speed) {
    var wind = "";
    if (speed > 0 && speed < 12) {
        wind = windSpeed[speed] + ", ";
    } else {
        wind = "Hurricane" + ", ";
    }

    if (deg >= 0 && deg <= 45) {
        wind += windDeg[0];
        return wind;
    } else if (deg > 45 && deg <= 90) {
        wind += windDeg[45];
        return wind;
    } else if (deg > 90 && deg <= 135) {
        wind += windDeg[90];
        return wind;
    } else if (deg > 135 && deg <= 180) {
        wind += windDeg[135];
        return wind;
    } else if (deg > 180 && deg <= 225) {
        wind += windDeg[180];
        return wind;
    } else if (deg > 225 && deg <= 270) {
        wind += windDeg[225];
        return wind;
    } else if (deg > 270 && deg <= 315) {
        wind += windDeg[270];
        return wind;
    } else if (deg > 315) {
        wind += windDeg[315];
        return wind;
    }
}

// object for the wind direction
var windDeg = {
    0: "N",
    45: "NE",
    90: "E",
    135: "SE",
    180: "S",
    225: "SW",
    270: "W",
    315: "NW"
};

// object for the wind speed discription
var windSpeed = {
    0: "Calm",
    1: "Light air",
    2: "Light breeze",
    3: "Gentle breeze",
    4: "Moderate breeze",
    5: "Fresh breeze",
    6: "Strong breeze",
    7: "Moderate gale",
    8: "Fresh gale",
    9: "Strong gale",
    10: "Whole gale",
    11: "Storm"
};

//  object which contains the images different weather
var weatherImages = {
    "drizzle": 'images/drizzle.jpg',
    "clouds": 'images/clouds.jpg',
    "rain": "images/rain.jpg",
    "snow": "images/snow.jpg",
    "clear": "images/clear.jpg",
    "thunderstom": "images/thunderstom.jpg",
};


// converts temperature from Fahrenheit to Celsius
function toCelsius(fahr) {
    return Math.round(((fahr - 32) * 5) / 9);
}

// converts temperature from Celsius to Fahrenheit
function toFahrenheit(cel) {
    return Math.round(((cel * 9) / 5) + 32);
}