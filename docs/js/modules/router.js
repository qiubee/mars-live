import { photoData, weatherData } from "./data.js";
import { createWeatherCard, createPhotoCollection } from "./render.js";
import { loading } from "./UI.js";

export function route() {
    overview();
    routie({
        "detail": function(day) {

        },
        "date": function(date) {

        },
        "nl": function(language) {

        }
    });
}

async function overview() {
    loading(true, document.querySelector("main > article"));
    loading(true, document.querySelector("main > section"));
    const marsPhotos = await photoData(),
    marsWeather = await weatherData();
    createWeatherCard(marsWeather);
    createPhotoCollection();
}

function detailWeatherInformation() {

}

function filterWeatherDate() {

}