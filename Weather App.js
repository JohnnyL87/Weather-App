
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityinput") 
const weatherContainer = document.querySelector(".weather") 
const apiKey = "1293b958cde7e6295e0c90aec0b1a4a7";

//create an event listener function so that we can retrive the value of the input when the button is clicked
weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city); //getting the weather data
            displayWeatherInfo(weatherData); //displaying the weather data
        }
        catch(error){
            console.error(error);
            displayError(error.message);
        }
    }
    else{
        displayError("Please enter a valid city!!");
    }
});

//we will fetch the apiURL by the city and apiKey
async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    
    if(!response.ok){ //if the api fetch is not OK then we will shoot an error message
        throw new Error("Weather data not retrieved");
    }

    return await response.json(); //return an object in an a json format
}

//we will gather the info we need
function displayWeatherInfo(data){

    //using object destructuring and array destructuring we will access the data that we need
    const {name: city, main: {temp, humidity}, weather: [{description, id}], wind: {speed}} = data; // we will asign it all to data
    
    weatherContainer.textContent = "";
    weatherContainer.style.display = "block";

    //create an element for each display
    const cityDisplay = document.createElement("h2");
    const tempDisplay = document.createElement("h1");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const windDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("h3");

    //we will customize the content on the DOM
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32) .toFixed(1)} °F`; // Convert temperature to Celsius
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = `Description: ${description}`;
    windDisplay.textContent = `Wind Speed: ${speed} Mph`;
    weatherEmoji.textContent = getWeatherIcon(id);

    //add a class attribute to each diplay so we can alter it in css
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    windDisplay.classList.add("windDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    

    // Clear previous content and display new weather info
    weatherContainer.innerHTML = "";
    weatherContainer.appendChild(cityDisplay);
    weatherContainer.appendChild(weatherEmoji);
    weatherContainer.appendChild(tempDisplay);
    weatherContainer.appendChild(humidityDisplay);
    weatherContainer.appendChild(windDisplay);
    weatherContainer.appendChild(descDisplay);


    //we could customize this even more. By adding unique information depending on the weather
    
}

//Switch and case to determine what emoji we should return based on the weatherId
function getWeatherIcon(weatherId){
    
    if(weatherId >= 200 && weatherId < 300){
        return "⛈️";
    }
    else if(weatherId >= 300 && weatherId < 400){
        return "🌧️";
    }
    else if(weatherId >= 500 && weatherId < 600){
        return "🌧️";
    }
    else if(weatherId >= 600 && weatherId < 700){
        return "❄️";
    }
    else if(weatherId >= 700 && weatherId < 800){
        return "🌫️";
    }
    else if(weatherId === 800){
        return "☀️";
    }
    else if(weatherId >= 801 && weatherId < 810){
        return "☁️";
    }
    else{
        return "?";
    }
    
}

//we will pass our displayError messages and create an element and text content for it
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    weatherContainer.innerHTML = "";

    weatherContainer.appendChild(errorDisplay);
    weatherContainer.style.display = "flex";
}

