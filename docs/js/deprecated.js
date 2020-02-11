/*jshint esversion: 6 */
const apiKey = "B0XkeeKZ8AD1ZEIYa7o26ya0bBDkvsXV3fn94GE2";

const mars = {
    weatherURL: `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`,
    photosURL: "https://api.nasa.gov/mars-photos/api/v1/rovers/" + this.rover + "/photos" + this.sol + this.camera + `&api_key=${apiKey}`,
    rover: "curiosity",
    camera: "&camera=mast",
    sol: "?sol=416",
    day: `?earth_date=${getDate()}`
};

// -- Fetch data --
// fetch(`${mars.weatherUrl}?api_key=${apiKey}&feedtype=json&ver=1.0`)
//     .then(function(res) {
//         if (res.ok) {
//             res.json()
//             .then(function(res) {
//                 return res;
//             })
//             .catch(function(err) {
//                 console.error(err);
//             });
//         }
        
//     })
//     .catch(function(err) {
//         console.error(err);
//     });

// -- Fetch data from multiple API's with Promise.all --
Promise.all([
    fetch(`${mars.weatherUrl}?api_key=${apiKey}&feedtype=json&ver=1.0`),
    fetch(`${mars.photosUrl}${mars.rover}/photos${mars.sol}${mars.camera}&api_key=${apiKey}`)
]).then(function (res) {
    configureData(res);
});

function configureData(data) {
    const weatherData = data[0];
    const photosData = data[1];

    console.log(weatherData, photosData);
}

function createWeatherCard(weatherData) {
    const article = document.querySelector("main > article");
    weatherData.map(function (item) {
        
        // create section & append to article
        const section = article.appendChild(createElement("section"));

        // add dayname as title to section
        section.appendChild(createElement("h3")).appendChild(addText(`${item.day} (${item.sol} Sol)`));

        // add list with weather data
        const ul = section.appendChild(createElement("ul"));
        
        // temperature
        ul.appendChild(createElement("li")).appendChild(addText(item.temp.average + "\xB0C"));
        // wind speed
        ul.appendChild(createElement("li")).appendChild(addText(item.wind.speed));
        // wind direction
        ul.appendChild(createElement("li")).appendChild(addText(item.wind.direction));
    });
}

function filterWeatherData(data) {
    let days = [];
    // loop over array with key of days
    data.sol_keys.map(function (key) {
        // Get all keys of objects
        Object.keys(data).map(function (item) {
            // check for the same key
            if (key === item) {
                // bind the object with the same key to variable
                const obj = data[key];

                // create temperatures
                const minTemp = Math.round(obj.AT.mn);
                const maxTemp = Math.round(obj.AT.mx);
                const averageTemp = Math.round(obj.AT.av);

                // set wind data
                const windSpeed = Number(Number(obj.HWS.av).toFixed(1));
                const windDirection = obj.WD.most_common.compass_point.replace(/S/g, "Z").replace(/E/g, "O");

                // get date & year
                const date = obj.First_UTC.replace(/\T(.*)/, "");
                const year = Number(obj.First_UTC.substring(0, 4));

                // get name of day & month in Dutch
                // const day = new Intl.DateTimeFormat('nl-NL', {weekday: "long"}).format(new Date(obj.First_UTC));
                // const month = new Intl.DateTimeFormat('nl-NL', {month: "long"}).format(new Date(obj.First_UTC));

                // get name of day & month in English
                const day = new Intl.DateTimeFormat('en-GB', {weekday: "long"}).format(new Date(obj.First_UTC));
                const month = new Intl.DateTimeFormat('en-GB', {month: "long"}).format(new Date(obj.First_UTC));

                // get sol day
                const sol = Number(key);

                // translate name of season to Dutch
                let season;
                switch (obj.Season) {
                    case "summer":
                        season = "zomer";
                        break;
                    case "spring":
                        season = "lente";
                        break;
                    case "autumn":
                        season = "herfst";
                        break;
                }
 
                // add relevant data to empty array
                days.push(
                    {   date: date,
                        year: year,
                        month: month,
                        day: day,
                        temp: {min: minTemp, max: maxTemp, average: averageTemp}, 
                        wind: {speed: windSpeed, direction: windDirection},
                        season: season,
                        sol: sol
                    });
                }
        });
    });
    return days;
}

// Give date from current day (0 = today)
function getDate(fromCurrentDay = 0) {
    const date = new Date(new Date().setDate(new Date().getDate()+fromCurrentDay));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + "-" + month + "-" + day;
}

// create element
function createElement(element) {
    return document.createElement(element);
}

// create text
function addText(text) {
    return document.createTextNode(text);
}

function convertToBeaufort(windspeed) {

}