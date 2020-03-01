import { photoData, weatherData } from "./data.js";
import { createWeatherCard, createPhotoCollection, showDetailedWeather } from "./render.js";
import { loading } from "./UI.js";

export async function route() {
    await overview();
    routie({
        ":day": async function(day) {
            const node = document.querySelector(`a[href="#${day}"]`);
            loading(true, node, "loading details...");
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