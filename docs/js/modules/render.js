import { addElementWithText } from "../utils/addAndDeleteElement.js";
import { loading } from "./UI.js";

export function createWeatherCard(weatherData) {
    const article = document.querySelector("main > article");

    // error message when photo data is unavailable
    errorHandle(article, weatherData, "We aren't able to show weather information at the moment. Please refresh the page to try again.");
    
    weatherData.map(function (item) {
        // create section & append to article
        const link = addElementWithText(article, "a");
        link.setAttribute("href", `#${item.day.toLowerCase()}`);

        // create section & append to article
        const section = addElementWithText(link, "section");

        // add dayname as title to section
        addElementWithText(section, "h3", `${item.day} (${item.sol} Sol)`);

        // add list with weather data
        const ul = addElementWithText(section, "ul");

        // temperature
        item.temperature.average === "unknown" ? addElementWithText(ul, "li", item.temperature.average): addElementWithText(ul, "li", item.temperature.average + "\xB0C");
    });
}

export function createPhotoCollection(photoData) {
    const section = document.querySelector("main > section");

    // error message when photo data is unavailable
    errorHandle(section, photoData, "We aren't able to show photos of Mars at the moment. Please refresh the page to try again.");
}

function errorHandle(element, data, text) {
    if (data) {
        return loading(false, element);
    } else {
        loading(false, element);
        return addElementWithText(element, "p", text);
    }
}

export function showDetailWeatherInformation(weatherData) {
    // wind speed
    // addElementWithText(ul, "li", item.wind.speed);
    // wind direction
    // addElementWithText(ul, "li", item.wind.direction);
}