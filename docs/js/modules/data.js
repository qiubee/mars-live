import { getMarsPhotoData, getMarsWeatherData } from "./api.js";

async function cleanWeatherData() {
    const rawWeatherData = await getMarsWeatherData();
    if (rawWeatherData === undefined) {
        return;
    }
    console.log("Raw weather data:", rawWeatherData);
    const cleanWeatherData = filterWeatherData(rawWeatherData);
    console.log("Filtered weather data:", cleanWeatherData);
    return cleanWeatherData;
}

async function cleanPhotoData() {
    const rawPhotoData = await getMarsPhotoData();
    if (rawPhotoData === undefined) {
        return;
    }
    console.log("Raw photo data:", rawPhotoData);
    // const cleanPhotoData = filterPhotoData(rawPhotoData);
    // console.log("Filtered photo data:", cleanPhotoData);
    // return cleanPhotoData;
}

function filterWeatherData(data, language = "en") {
    let days = [];
    const lang = language;
    // loop over array with key of days
    data.sol_keys.map(function (key) {
        // Get all keys of objects
        Object.keys(data).map(function (item) {
            // check for the same key
            if (key === item) {
                // bind the object with the same key to variable
                const obj = data[key];

                // create temperatures
                const minTemp = obj.AT === undefined ? "unknown" : Math.round(obj.AT.mn);
                const maxTemp = obj.AT === undefined ? "unknown" : Math.round(obj.AT.mx);
                const averageTemp = obj.AT === undefined ? "unknown" : Math.round(obj.AT.av);

                // set wind speed
                const windSpeed = obj.HWS === undefined ? "unknown" : Number(Number(obj.HWS.av).toFixed(1));
                let windDirection = obj.HWS === undefined ? "unknown" : obj.WD.most_common.compass_point;

                // get date & year
                const date = obj.First_UTC.replace(/\T(.*)/, "");
                const year = Number(obj.First_UTC.substring(0, 4));

                // get name of day & month in English
                let day = getFullNameOf(obj.First_UTC).toLowerCase();
                let month = getFullNameOf(obj.First_UTC, false, true).toLowerCase();

                // get sol day
                const sol = Number(key);
                // get season name
                let season = obj.Season;

                // translate to set language
                switch (lang) {
                    case "nl":
                        season = translateSeasonNameToDutch(season);
                        windDirection = windDirection.replace(/S/g, "Z").replace(/E/g, "O");
                        day = getFullNameOf(obj.First_UTC, true, false, "nl-NL");
                        month = getFullNameOf(obj.First_UTC, false, true, "nl-NL");
                        break;
                }

                // add relevant data to empty array
                days.push({
                    date: date,
                    year: year,
                    month: month,
                    day: day,
                    temp: {
                        min: minTemp,
                        max: maxTemp,
                        average: averageTemp
                    },
                    wind: {
                        speed: windSpeed,
                        direction: windDirection
                    },
                    season: season,
                    sol: sol,
                    lang: lang
                });
            }
        });
    });
    return days;
}

function translateSeasonNameToDutch(season) {
    switch (season) {
        case "summer":
            return "zomer";
        case "spring":
            return "lente";
        case "autumn":
            return "herfst";
    }
}

function getFullNameOf(date, day = true, month = false, language = "en-GB") {
    let options = {};
    if (day === true && month === true) {
        console.error("Cannot return multiple names");
        return;
    }
    if (day === true) {
        options.weekday = "long";
    }
    if (month === true) {
        options.month = "long";
    }
    return new Intl.DateTimeFormat(language, options).format(new Date(date));
}

export async function weatherData() {return await cleanWeatherData(getMarsWeatherData());}
export async function photoData() {return await cleanPhotoData(getMarsPhotoData());}