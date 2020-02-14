import getDate from "../utils/getDate.js";
export const api = (function () {
    const apiKey = "B0XkeeKZ8AD1ZEIYa7o26ya0bBDkvsXV3fn94GE2";

    const mars = {
        rover: "curiosity",
        camera: "&camera=mast",
        sol: "?sol=416",
        day: `?earth_date=${getDate()}`
    };

    const endpoints = {
        marsWeatherURL: `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`,
        marsPhotosURL: `https://api.nasa.gov/mars-photos/api/v1/rovers/${mars.rover}/photos${mars.sol}${mars.camera}&api_key=${apiKey}`,
    };

    // Request data
    async function fetchData(url) {
        const res = await fetch(url);
        if (!res.ok) {
            console.error("Response was not ok", res.text);
            return undefined;
        }
        return await res.json();
    }
    return {
        getMarsWeatherData: fetchData(endpoints.marsWeatherURL),
        getMarsPhotos: fetchData(endpoints.marsPhotosURL)
    };
})();