export function createWeatherCard(weatherData) {
    const main = document.querySelector("main");
    
    // create article & append to main
    const article = main.appendChild(createElement("article"));
    addElementWithText(article, "h2", "Weather on Mars last week");

    // error state
    if (weatherData === undefined) {
        addElementWithText(article, "p", "We aren't able to show weather information at the moment. Refresh the page to try again.");
        return;
    }

    weatherData.map(function (item) {
        // create section & append to article
        const section = article.appendChild(createElement("section"));

        // add dayname as title to section
        addElementWithText(section, "h3", `${item.day} (${item.sol} Sol)`);

        // add list with weather data
        const ul = section.appendChild(createElement("ul"));

        // temperature
        addElementWithText(ul, "li", item.temp.average + "\xB0C");
        // wind speed
        addElementWithText(ul, "li", item.wind.speed);
        // wind direction
        addElementWithText(ul, "li", item.wind.direction);
    });
}

function createElement(element) {
    return document.createElement(element);
}

function addText(text) {
    return document.createTextNode(text);
}

function addElementWithText(element, newElement, text) {
    return element.appendChild(createElement(newElement)).appendChild(addText(text));
}