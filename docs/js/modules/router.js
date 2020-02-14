import { api } from "./api.js";
import { data } from "./data.js";
import { render } from "./render.js";
export async function overview() {
    const rawMarsPhotos = await api.getMarsPhotos,
    rawMarsWeatherData = await api.getMarsWeatherData;
    if (rawMarsPhotos === undefined || rawMarsWeatherData === undefined) {
        console.log("render no data");
        render.noData;
    }
    const filteredWeatherData = data.cleanWeatherData(rawMarsWeatherData);
    render.overview(filteredWeatherData);
}

function detailWeatherInformation() {

}

function filterWeatherDate() {

}