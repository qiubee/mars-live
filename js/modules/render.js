import { addElementWithText } from "../utils/element.js";
import { getNameofDay } from "../utils/date.js";
import { loading } from "./UI.js";

export function createWeatherCard(weatherdata) {
    const article = document.querySelector("main > article");

    // error message when photo data is unavailable
    errorHandle(article, weatherdata, "We aren't able to show weather information at the moment. Please refresh the page to try again.");

    // reverse order of looping items (source: https://stackoverflow.com/questions/36415904/is-there-a-way-to-use-map-on-an-array-in-reverse-order-with-javascript)
    weatherdata.slice(0).reverse().map(function (item) {
        // create section & append to article
        const link = addElementWithText(article, "a");
        link.setAttribute("href", `#${item.day.toLowerCase()}`);

        // create section & append to article
        const section = addElementWithText(link, "section");

        // add header to section
        const h3 = addElementWithText(section, "h3");

        // add name of day as span elements to header
        item.day === getNameofDay(-1) ? addElementWithText(h3, "span", "Yesterday") : addElementWithText(h3, "span", `${item.day} `);
        addElementWithText(h3, "span", `(${item.sol} Sol)`);

        // add temperature
        item.temperature.average === "unknown" ? addElementWithText(section, "p", item.temperature.average): addElementWithText(section, "p", item.temperature.average + "\xB0C");
    });
}

export function createPhotoCollection(photodata) {
    const section = document.querySelector("main > section");

    // error message when photo data is unavailable
    errorHandle(section, photodata, "We aren't able to show photos of Mars at the moment. Please refresh the page to try again."); // <-- bug #1
}

function errorHandle(element, data, text) {
    if (data) {
        return loading(false, element);
    } else {
        // loading(false, element); // <-- bug #1 ErrorHandling: text won't display (Node not found)
        return addElementWithText(element, "p", text);
    }
}

export function showDetailedWeather(day, weatherdata) {
    if (/^(^mon|tues|wednes|thurs|fri|satur|sun)day$/gim.test(day)) {

    }
    // wind speed
    // addElementWithText(ul, "li", item.wind.speed);
    // wind direction
    // addElementWithText(ul, "li", item.wind.direction);
    // Convert windspeed to Beaufort scale
    // function convertToBeaufort(windspeed) {
    // }
}