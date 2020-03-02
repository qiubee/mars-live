// Convert windspeed to Beaufort scale
export function convertToBeaufort(windspeed, unit = "m/s") {
    switch (unit) {
        case "m/s":
            return Math.round(Math.pow((windspeed / 0.836), 2/3));
        case "km/h":
            return Math.round(Math.pow((windspeed / 3.01), 2/3));
        case "mph":
            return Math.round(Math.pow((windspeed * 0.535), 2/3));
        case "knots":
            return Math.round(Math.pow((windspeed * 0.615), 2/3));
    }
}