import { addElementWithText } from "../utils/element.js";
import { getDate } from "../utils/date.js";
import { loading, hideWeatherCards } from "./UI.js";

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
        item.date === getDate(-1) ? addElementWithText(h3, "span", "Yesterday") : addElementWithText(h3, "span", `${item.day} `);
        addElementWithText(h3, "span", `(${item.sol} Sol)`);

        // add temperature
        item.temperature.average === "unknown" ? addElementWithText(section, "p", item.temperature.average): addElementWithText(section, "p", item.temperature.average + "\xB0C");
    });
}

export function createPhotoCollection(photodata) {
    const section = document.querySelector("main > section");

    // error message when photo data is unavailable
    errorHandle(section, photodata, "We aren't able to show photos of Mars at the moment. Please refresh the page to try again.");
}

export async function showDetailedWeather(day, weatherdata) {
    // replace day with week in header
    const title = document.querySelector("main > article > h2");
    title.textContent = title.textContent.replace("week", day);

    // hide cards except selected one
    const cards = document.querySelectorAll("a[href$=\"day\"]");
    await hideWeatherCards(cards, day);
    
    // add class *detail* to article
    const article = document.querySelector("main > article");
    article.classList.toggle("detail");

    // create section & append to article
    const section = addElementWithText(article, "section");

    // add header to section
    const h3 = addElementWithText(section, "h3", "Details");

    // activate loader
    loading(true, section, "Loading details");

    // wind speed
    // addElementWithText(ul, "li", item.wind.speed);
    // wind direction
    // addElementWithText(ul, "li", item.wind.direction);
    // Convert windspeed to Beaufort scale
    // function convertToBeaufort(windspeed) {
    // }
}

function errorHandle(element, data, text) {
    if (data) {
        return loading(false, element);
    } else {
        loading(false, element);
        return addElementWithText(element, "p", text);
    }
}