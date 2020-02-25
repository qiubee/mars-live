import { photoData, weatherData } from "./data.js";
import { createWeatherCard, createPhotoCollection } from "./render.js";
import { loading } from "./UI.js";

export function route() {
    overview();
    routie({
        ":day": async function(day) {
            loading(true, document.querySelector("main > article"));
            if (/^(^mon|tues|wednes|thurs|fri|satur|sun)day$/gim.test(day)) {
                const marsWeather = await weatherData();
            } else { 
                loading(false, document.querySelector("main > article")); 
            }
            
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