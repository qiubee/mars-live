import { photoData, weatherData } from "./data.js";
import { createWeatherCard } from "./render.js";

export function route() {
    overview();
    routie({
        "detail": function(day) {

        },
        "date": function(date) {

        }
    });
}

async function overview() {
    const marsPhotos = await photoData(),
    marsWeather = await weatherData();
    if (marsPhotos === undefined || marsWeather === undefined) {
        console.log("render no data");
    }
    createWeatherCard(marsWeather);
}

function detailWeatherInformation() {

}

function filterWeatherDate() {

}