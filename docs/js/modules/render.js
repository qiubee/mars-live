export const render = (function(){
    function overview(weatherData, photoData) {
        createWeatherCard(weatherData);
    }
    function error() {

    }
    function createWeatherCard(weatherData) {
        const article = document.querySelector("main > article");
        weatherData.map(function (item) {
            
            // create section & append to article
            const section = article.appendChild(createElement("section"));
    
            // add dayname as title to section
            section.appendChild(createElement("h3")).appendChild(addText(`${item.day} (${item.sol} Sol)`));
    
            // add list with weather data
            const ul = section.appendChild(createElement("ul"));
            
            // temperature
            ul.appendChild(createElement("li")).appendChild(addText(item.temp.average + "\xB0C"));
            // wind speed
            ul.appendChild(createElement("li")).appendChild(addText(item.wind.speed));
            // wind direction
            ul.appendChild(createElement("li")).appendChild(addText(item.wind.direction));
        });
    }
    return {
        overview: overview(),
        error: error()
    };
})();