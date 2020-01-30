//Init storage
const storage = new Storage();
//get stored location data
const weatherLocation = storage.getLocationData();
//Init weather object
const weather = new Weather(weatherLocation.city, weatherLocation.state);
//Init UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);

//Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;

    weather.changeLocation(city, state);

    storage.setLocationData(city, state);

    //get and display weather
    getWeather();

    //close modal
    $('#locModal').modal('hide');
})

function getWeather(){
    weather.getWeather()
    .then(results => {
        ui.paint(results);
    })
    .catch(err => console.log(err));
}