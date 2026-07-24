// Get the forecast real-time info to show in the home cards.

const { createElement } = require("react");

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
        //icon

        const cityTemp = document.createElement("p");
        cityTemp.className = "city-temp";
        cityTemp.textContent = city.temperature;

        const cityHum = document.createElement("p");
        cityHum.className = "city-hum";
        cityHum.textContent = city.humidity;

        const citySensation = document.createElement("p");
        citySensation.className = "city-app-temp";
        citySensation.textContent = city.apparent_temperature;
        
        card.appendChild(cityName);
        card.appendChild(cityTemp);
        card.appendChild(cityHum);
        card.appendChild(citySensation);

        container.appendChild(card)
    }
}
