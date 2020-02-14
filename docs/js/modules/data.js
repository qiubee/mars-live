function cleanWeatherData(weatherData) {
    if (weatherData === undefined) {
        return;
    }
    console.log("Raw weather data:", weatherData);
    const cleanWeatherData = filterWeatherData(weatherData);
    console.log("Filtered weather data:", cleanWeatherData);
    return cleanWeatherData;
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
                const minTemp = Math.round(obj.AT.mn);
                const maxTemp = Math.round(obj.AT.mx);
                const averageTemp = Math.round(obj.AT.av);

                // set wind speed
                const windSpeed = Number(Number(obj.HWS.av).toFixed(1));
                let windDirection = obj.WD.most_common.compass_point;

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
    let dutchSeasonName;
    switch (season) {
        case "summer":
            dutchSeasonName = "zomer";
            break;
        case "spring":
            dutchSeasonName = "lente";
            break;
        case "autumn":
            dutchSeasonName = "herfst";
            break;
    }
    return dutchSeasonName;
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

export const data = {
    cleanWeatherData: function (weatherData) {
        if (weatherData === undefined) {
            return;
        }
        console.log("Raw weather data:", weatherData);
        const cleanWeatherData = filterWeatherData(weatherData);
        console.log("Filtered weather data:", cleanWeatherData);
        return cleanWeatherData;
    }
};