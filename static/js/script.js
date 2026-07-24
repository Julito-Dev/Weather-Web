// Get the forecast real-time info to show in the home cards.;
async function loadFeaturedCities() {
    const response = await fetch("/feature");

    const data = await response.json();

    console.log(data)
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



//execute

buildCards()