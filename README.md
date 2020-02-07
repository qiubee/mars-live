# Live on Mars

![Preview image of website showing weather forecast and images of Mars]()

## Description

Always wanted to know what it's like to be on Mars? With this app you can see the weather of the past 7 days, and have a look around the surface of Mars.

## API

To create the app, the following API's have been used to collect the data:

* **InSight: Mars Weather Service API**
* **Mars Rover Photos API**.

These API's are listed at [NASA's API Portal](https://api.nasa.gov/)

### Insight: Mars Weather Service API

The Insight API provides weather data from NASA's InSight Mars lander that continuously measures temperature, wind and pressure from the surface of Mars.

#### Data

When calling the Insight API, you receive the following data:

* Sol [(Mars solar day)](https://en.wikipedia.org/wiki/Sol_(day_on_Mars))
* Air temperatures (°C)
  * Minimum temp.
  * Average temp.
  * Maximum temp.
* Wind speed (m/s)
  * Minimum speed
  * Average speed
  * Maximum speed
* Pressure (Pa)
  * Minimum pressure
  * Average pressure
  * Maximum Pressure
* Wind direction
* The current weather season

The amount of sol (days) will always be 7 (1 week), and in the data the sol number will correspond to the day of the week. The data will return as a JSON-object.

This is an example of the JSON-object you receive from the **Insight API**:

```json
{
    "419": {
        "AT": {
            "av": -61.24,
            "ct": 343156,
            "mn": -96.104,
            "mx": -12.419
        },
        "HWS": {
            "av": -5.091,
            "ct": 137176,
            "mn": 0.182,
            "mx": 20.209
        },
        "PRE": {
            "av": 628.617,
            "ct": 172951,
            "mn": 605.4989,
            "mx": 642.7481
        },
        "WD": {
            "0": {
                    "compass_degrees": 0,
                    "compass_point": "N",
                    "compass_right": 0,
                    "compass_up": 1,
                    "ct": 2,
            },
            "1": {
                    "compass_degrees": 22.5,
                    "compass_point": "NNE",
                    "compass_right": 0.382683432365,
                    "compass_up": 0.923879532511,
                    "ct": 136,
            },
            "2": {
                    "compass_degrees": 45,
                    "compass_point": "NE",
                    "compass_right": 0.707106781187,
                    "compass_up": 0.707106781187,
                    "ct": 728,
            },
            "3": {
                    "compass_degrees": 67.5,
                    "compass_point": "ENE",
                    "compass_right": 0.923879532511,
                    "compass_up": 0.382683432365,
                    "ct": 4506,
            },
            "5": {
                    "compass_degrees": 112.5,
                    "compass_point": "ESE",
                    "compass_right": 0.923879532511,
                    "compass_up": -0.382683432365,
                    "ct": 7050,
            },
            "6": {
                    "compass_degrees": 135,
                    "compass_point": "SE",
                    "compass_right": 0.707106781187,
                    "compass_up": -0.707106781187,
                    "ct": 21365,
            },
            "6": {
                    "compass_degrees": 135,
                    "compass_point": "SE",
                    "compass_right": 0.707106781187,
                    "compass_up": -0.707106781187,
                    "ct": 21365,
                },
            "7": {
                    "compass_degrees": 157.5,
                    "compass_point": "SSE",
                    "compass_right": 0.382683432365,
                    "compass_up": -0.923879532511,
                    "ct": 21165,
                },
            "8": {
                    "compass_degrees": 180,
                    "compass_point": "S",
                    "compass_right": 0,
                    "compass_up": -1,
                    "ct": 13676,
                },
            "9": {
                    "compass_degrees": 202.5,
                    "compass_point": "SSW",
                    "compass_right": -0.382683432365,
                    "compass_up": -0.923879532511,
                    "ct": 16011,
                },
            "10": {
                    "compass_degrees": 225,
                    "compass_point": "SW",
                    "compass_right": -0.707106781187,
                    "compass_up": -0.707106781187,
                    "ct": 16110,
                },
            "11": {
                    "compass_degrees": 247.5,
                    "compass_point": "WSW",
                    "compass_right": -0.923879532511,
                    "compass_up": -0.382683432365,
                    "ct": 4057,
                },
            "12": {
                    "compass_degrees": 270,
                    "compass_point": "W",
                    "compass_right": -1,
                    "compass_up": -0,
                    "ct": 25338,
                },
            "13": {
                    "compass_degrees": 292.5,
                    "compass_point": "WNW",
                    "compass_right": -0.923879532511,
                    "compass_up": 0.382683432365,
                    "ct": 6986,
                },
            "14": {
                    "compass_degrees": 315,
                    "compass_point": "NW",
                    "compass_right": -0.707106781187,
                    "compass_up": 0.707106781187,
                    "ct": 42,
                },
            "15": {
                    "compass_degrees": 337.5,
                    "compass_point": "NNW",
                    "compass_right": -0.382683432365,
                    "compass_up": 0.923879532511,
                    "ct": 4,
                },
            "most_common": {
                    "compass_degrees": 270,
                    "compass_point": "W",
                    "compass_right": -1,
                    "compass_up": -0,
                    "ct": 25338
                }
    },
    "420": {...},
    "421": {...},
    "422": {...},
    "423": {...},
    "424": {...},
    "425": {...},
    "sol_keys": ["419", "420", "421", "422", "423", "424", "425"],
    "validity_checks": {
        "418": {...},
        "419": {...},
        "420": {...},
        "421": {...},
        "422": {...},
        "423": {...},
        "424": {...},
        "425": {...},
        "sol_hours_checked": 18,
        "sol_checked": ["418", "419", "420", "421", "422", "423", "424", "425"]
    }
}
```

### Mars Rover Photos API

The Mars Rover Photos API provides access to a database of onphotos taken on Mars. The pictures taken on Mars have been shot by NASA's rovers. You're able to specify which of the three rovers you want pictures of. You're also able to select the camera that has been taking the pictures.

#### Data

When calling the Mars Rover Photos API, you receive a list with the following data:

* Sol [(Mars solar day)](https://en.wikipedia.org/wiki/Sol_(day_on_Mars))
* Image source

The amount of data you receive depends on the query you send to the API. The data will return as a JSON-object.

This is an example of the JSON-object you receive from the **Mars Rover Photos API**:

```json
{
    "photos": [
        {
            "camera": {
                "full_name": "Mast Camera",
                "id": 22,
                "name": "MAST",
                "rover_id": 5
            },
            "earth_date": "2013-10-07",
            "id": 4180,
            "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/msss/00416/mcam/0416ML0017120000201063I01_DXXX.jpg",
            "rover": {
                "cameras": [
                    {
                        "full_name": "Front Hazard Avoidance Camera",
                        "name": "FHAZ"
                    },
                    {
                        "full_name": "Navigation Camera",
                        "name": "NAVCAM"
                    },
                    {
                        "full_name": "Chemistry and Camera Complex",
                        "name": "CHEMCAM"
                    },
                    {
                        "full_name": "Mars Hand Lens Imager",
                        "name": "MAHLI"
                    },
                    {   "full_name": "Mars Descent Imager",
                        "name": "MARDI"
                    },
                    {
                        "full_name": "Rear Hazard Avoidance Camera",
                    "name": "RHAZ"
                    }
                ],
                "id": 5,
                "landing_date": "2012-08-06",
                "launch_date": "2011-11-26",
                "max_date": "2019-09-28",
                "max_sol": 2540,
                "name": "Curiosity",
                "status": "active",
                "total_photos": "366206"
            },
            "sol": 416
        }
    ]
}
```

### API-key

To collect data from NASA, you are required to have an API-key. The key allows you to make a call to their API's.

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
