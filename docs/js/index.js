/*jshint esversion: 8 */

// -- Promise --
// fetch("https://api.maas2.apollorion.com/")
//     .then(function(res) {
//         res.json()
//             .then(function(res) {
//                 const data = res;
//                 console.log(data);
//             })
//             .catch(function(err) {
//                 console.error(err);
//             });
//     })
//     .catch(function(err) {
//         console.error(err);
//     });

// fetch("https://api.nasa.gov/EPIC/api/natural/data?api_key=DEMO_KEY")
//     .then(function(res) {
//         res.json()
//             .then(function(res) {
//                 console.log(res);
//         });
//     })
//     .catch(function(err) {
//         console.error(err);
//     });

// -- Async/Await --
getMarsData();
getTheWorld();
async function getMarsData() {
    const marsData = await (await fetch("https://api.maas2.apollorion.com/")).json();
    console.log(marsData);
}

async function getTheWorld() {
    const worldData = await (await fetch("https://api.nasa.gov/EPIC/api/natural/data?api_key=DEMO_KEY")).json();
    console.log(worldData);
}