import api from "./api.js";
import data from "./data.js";
export const router = (function(){
    function overview() {
        if (api.getMarsWeatherData === undefined) {
            
        }
        const photoData = api.getMarsPhotos;
    }
    function detailWeatherInformation() {

    }
    function filterWeatherDate() {
        
    }
    return {
        overview: overview(),
        detailWeather: detailWeatherInformation(),
        filterWeather: filterWeatherDate()
    };
})();