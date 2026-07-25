// Get the forecast real-time info to show in the home cards.;
async function loadFeaturedCities() {
    const response = await fetch("/feature");

    const data = await response.json();

    return data
}


// build the cards

async function buildCards() {
    const cities = await loadFeaturedCities()


    const container = document.getElementById("cities-container");
    container.innerHTML = ""

    for(const city of cities) {
        const card = document.createElement("div");
        card.className = "city-card";

        const cityName = document.createElement("p");
        cityName.className = "city-name";
        cityName.textContent = city.city;
    

        const icon = document.createElement("i")
        icon.className = `fa-solid ${getIcon(city.weather_code)} city-icon`;


        const cityTemp = document.createElement("p");
        cityTemp.className = "city-temp";
        cityTemp.textContent = `${city.temperature}°C`;

        const cityHum = document.createElement("p");
        cityHum.className = "city-hum";
        cityHum.textContent = `Humidity ${city.humidity}%`;

        const citySensation = document.createElement("p");
        citySensation.className = "city-app-temp";
        citySensation.textContent = `Apparent Temperature: ${city.apparent_temperature}`;
        
        card.appendChild(cityName);
        card.appendChild(icon);
        card.appendChild(cityTemp);
        card.appendChild(cityHum);
        card.appendChild(citySensation);


        container.appendChild(card)
    }
}


function getIcon(weather_code){

    if (weather_code === 0)
        return "fa-sun";

    if (weather_code >= 1 && weather_code <= 3)
        return "fa-cloud-sun";

    if (weather_code === 45 || weather_code === 48)
        return "fa-smog";

    if (weather_code >= 51 && weather_code <= 67)
        return "fa-cloud-rain";

    if (weather_code >= 71 && weather_code <= 77)
        return "fa-snowflake";

    if (weather_code >= 95)
        return "fa-bolt";

    return "fa-cloud";

}


// Get the User Location 
async function initPosition() {
    try {
        const position = await getLocation();
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const weather = await fetchUserWeather(lat, lon);

        buildGiantCard(weather);
    }

    catch (error) {
        alert("Showing Default Information.");
    }
}

async function fetchUserWeather(lat, lon) {
    const response = await fetch(`/weather/locate?lat=${lat}&lon=${lon}`);

    if (!response.ok) {
        throw new Error("Error loandig the weather");
    }

    const data = await response.json();

    return data

}

const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
};

function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            options
        );
    });
}


function buildGiantCard(info){
    const container = document.getElementById("card-container");
    container.innerHTML = "";

    const cityName = document.createElement("p");
    cityName.className = "lcity-name";
    cityName.textContent = "📍 Your Location";

    const cityTemp = document.createElement("p");
    cityTemp.className = "lcity-temp";
    cityTemp.textContent = `${info.temperature}°C`;

    const cityHum = document.createElement("p");
    cityHum.className = "lcity-hum";
    cityHum.textContent = `Humidity: ${info.humidity}%`;

    const probRain = document.createElement("p");
    probRain.className = "prob-rain";
    probRain.textContent = `Precipitation Probability: ${info.precipitation_probability}%`


    //graph goes here

    container.appendChild(cityName);
    container.appendChild(cityTemp);
    container.appendChild(cityHum);
    container.appendChild(probRain);


}
//execute

await Promise.all([
    buildCards(),
    buildGiantCard()
]);