import { photoData, weatherData } from "./data.js";
import { createWeatherCard, createPhotoCollection, showDetailedWeather } from "./render.js";
import { loading } from "./UI.js";

export function route() {
    overview();
    routie({
        ":day": async function(day) {
            console.log(document.querySelectorAll("a"), document.querySelector(`a[href=\"#${day}\"]`));
            loading(true, document.getElementById(`${day}`));
            const marsWeather = await weatherData();
            showDetailedWeather(day, marsWeather);
        },
        "filter/:date": function(date) {

        },
        "nl": function() {

        }
    });
}

async function overview() {
    loading(true, document.querySelector("main > article"));
    loading(true, document.querySelector("main > section"));
    const marsPhotos = await photoData(),
    marsWeather = await weatherData();
    createWeatherCard(marsWeather);
    createPhotoCollection(marsPhotos);
}