import { photoData, weatherData } from "./data.js";
import { createWeatherCard, createPhotoCollection } from "./render.js";
import { loading } from "./UI.js";

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
    loading(true);
    const marsPhotos = await photoData(),
    marsWeather = await weatherData();
    createWeatherCard(marsWeather);
    createPhotoCollection();
}

function detailWeatherInformation() {

}

function filterWeatherDate() {

}