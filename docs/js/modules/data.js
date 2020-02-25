import { getMarsPhotoData, getMarsWeatherData } from "./api.js";
import { addToSessionStorage, checkInSessionStorage, getFromSessionStorage} from "./storage.js";

async function cleanWeatherData() {
    const rawWeatherData = await getMarsWeatherData();
    if (rawWeatherData === undefined) {
        return;
    }
    // console.log("Raw weather data:", rawWeatherData);
    const filteredWeatherData = filterWeatherData(rawWeatherData);
    // console.log("Filtered weather data:", filteredWeatherData);
    const transformedWeatherData = transformWeatherData(filteredWeatherData);
    // console.log("Transformed weather data:", transformedWeatherData);
    return transformedWeatherData;
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


function filterWeatherData(data) {
    let filteredData = [];
    // loop over array with sol days
    data.sol_keys.map(function (sol) {
        // loop over all keys of data object
        Object.keys(data).map(function (item) {
            // check for the same key
            if (sol === item) {
                // set sol day in item
                data[sol].sol = sol;
                // push to empty array
                filteredData.push(data[sol]);
            }
        });
    });
    return filteredData;
}

function transformWeatherData(data) {
    return data.map(function (item) {
        // round temperatures
        const minTemp = item.AT === undefined ? "unknown" : Math.round(item.AT.mn);
        const maxTemp = item.AT === undefined ? "unknown" : Math.round(item.AT.mx);
        const averageTemp = item.AT === undefined ? "unknown" : Math.round(item.AT.av);

        // set wind speed
        const windSpeed = item.HWS === undefined ? "unknown" : Number(Number(item.HWS.av).toFixed(1));
        const windDirection = item.HWS === undefined ? "unknown" : item.WD.most_common.compass_point;

        // get date & year
        const date = item.First_UTC.replace(/\T(.*)/, "");
        const year = Number(item.First_UTC.substring(0, 4));

        // get name of day & month
        const day = getFullNameOf(item.First_UTC);
        const month = getFullNameOf(item.First_UTC, false, true).toLowerCase();

        // set sol day
        const sol = Number(item.sol);

        return {
            date: date,
            year: year,
            month: month,
            day: day,
            temperature: {
                min: minTemp,
                max: maxTemp,
                average: averageTemp
            },
            wind: {
                speed: windSpeed,
                direction: windDirection
            },
            season: item.Season,
            sol: sol,
            lang: "en"
        };
    });
}

function switchLanguage(data, language) {
    switch (language) {
        case "nl":
            season = translateSeasonNameToDutch(season);
            windDirection = windDirection.replace(/S/g, "Z").replace(/E/g, "O");
            day = getFullNameOf(obj.First_UTC, true, false, "nl-NL");
            month = getFullNameOf(obj.First_UTC, false, true, "nl-NL");
            break;
    }
}

function translateSeasonNameToDutch(season) {
    switch (season) {
        case "summer":
            return "zomer";
        case "spring":
            return "lente";
        case "autumn":
            return "herfst";
        case "fall":
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

export async function weatherData() {
    if (checkInSessionStorage("weatherdata") === false) {
    const weatherData = await cleanWeatherData();
    addToSessionStorage("weatherdata", weatherData);
    return weatherData;
    } else if ((checkInSessionStorage("weatherdata") === true)) {
        return getFromSessionStorage("weatherdata");
    }
}
export async function photoData() {return await cleanPhotoData();}