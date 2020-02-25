import { addElementWithText } from "../utils/addAndDeleteElement.js";
import { loading } from "./UI.js";

export function createWeatherCard(weatherData) {
    const article = document.querySelector("main > article");

    // error text when weather data is unavailable
    if (weatherData === undefined) {
        loading(false, article);
        addElementWithText(article, "p", "We aren't able to show weather information at the moment. Refresh the page to try again.");
        return;
    }
    loading(false, article);
    weatherData.map(function (item) {
        // create section & append to article
        const section = addElementWithText(article, "section");

        // add dayname as title to section
        addElementWithText(section, "h3", `${item.day} (${item.sol} Sol)`);

        // add list with weather data
        const ul = addElementWithText(section, "ul");

        // temperature
        addElementWithText(ul, "li", item.temp.average + "\xB0C");
        // wind speed
        addElementWithText(ul, "li", item.wind.speed);
        // wind direction
        addElementWithText(ul, "li", item.wind.direction);
    });
}

export function createPhotoCollection(photoData) {
    const section = document.querySelector("main > section");
    
    // error text when photo data is unavailable
    if (photoData === undefined) {
        loading(false, section);
        addElementWithText(section, "p", "We aren't able to show photos of Mars at the moment. Refresh the page to try again.");
        return;
    }
    loading(false, section);
}