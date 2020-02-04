/*jshint esversion: 8 */
const apiKey = "B0XkeeKZ8AD1ZEIYa7o26ya0bBDkvsXV3fn94GE2";

const mars = {
    weatherUrl: "https://api.nasa.gov/insight_weather/",
    photosUrl: "https://api.nasa.gov/mars-photos/api/v1/rovers/",
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
// Promise.all([
//     fetch(`${mars.weatherUrl}?api_key=${apiKey}&feedtype=json&ver=1.0`),
//     fetch(`${mars.photosUrl}${mars.rover}/photos${mars.sol}${mars.camera}&api_key=${apiKey}`)
// ]);

// -- Fetch data with Async/Await --
// fetchMarsData();
getMarsWeather();
// getMarsPhotos();

async function fetchMarsData() {
    const marsWeather = getMarsWeather();
    const marsPhotos = getMarsPhotos();
}

async function getMarsWeather() {
    const marsWeather = await (await fetch(`${mars.weatherUrl}?api_key=${apiKey}&feedtype=json&ver=1.0`)).json();
    console.log("Raw weather data:", marsWeather);

    days = filterWeatherData(marsWeather);
    console.log("Filtered weather data:", days);
   
    // add 
    days.map(function (item) {
        const listItem = document.createElement("li");

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
                const minTemp = Math.round(obj.AT.mn) + "\xB0";
                const maxTemp = Math.round(obj.AT.mx) + "\xB0";
                const averageTemp = Math.round(obj.AT.av) + "\xB0";

                // set wind data
                const windSpeed = Math.round(obj.HWS.av);
                const windDirection = obj.WD.most_common.compass_point.replace(/S/g, "Z").replace(/E/g, "O");

                // get name of day and season
                const day = new Intl.DateTimeFormat('nl-NL', {weekday: "long"}).format(new Date(obj.Last_UTC).getDay()+1);

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
                    {   day: day,
                        temp: {min: minTemp, max: maxTemp, average: averageTemp}, 
                        wind: {speed: windSpeed, direction: windDirection},
                        season: season
                    });
                }
        });
    });
    return days;
}

async function getMarsPhotos() {
    const marsPhotos = await (await fetch(`${mars.photosUrl}${mars.rover}/photos${mars.sol}${mars.camera}&api_key=${apiKey}`)).json();
    console.log(marsPhotos);
}

// Give date from current day (0 = today)
function getDate(fromCurrentDay = 0) {
    const date = new Date(new Date().setDate(new Date().getDate()+fromCurrentDay));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + "-" + month + "-" + day;
}