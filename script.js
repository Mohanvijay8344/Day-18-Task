// TODOs:
// Modal
const countriesEl = document.getElementById("countries");
const toggleBtn = document.getElementById("toggle");
const filterBtn = document.getElementById("filter");
const searchEl = document.getElementById("search");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

getCountries();

async function getCountries() {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  displayCountries(countries);
}

function displayCountries(countries) {
  countriesEl.innerHTML = "";

  countries.forEach((country) => {
    const countryEl = document.createElement("div");
    countryEl.classList.add("card");

    countryEl.innerHTML = `
            <div>
                <img src="${country.flag}" alt="Germany" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name}</h3>
                <p>
                    <strong>Population:</strong>
                    ${country.population}
                </p>
                <p class="country-region">
                    <strong>Region:</strong>
                    ${country.region}
                </p>
                <p>
                    <strong>Capital:</strong>
                    ${country.capital}
                </p>
            </div>
        `;

    countryEl.addEventListener("click", () => {
      modal.style.display = "flex";
      showCountryDetails(country);
    });

    countriesEl.appendChild(countryEl);
  });
}

// Define your API key and city name
const apiKey = "https://openweathermap.org/";
const city = "Delhi";

// Construct the URL for the API call
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// Fetch the data from the API
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Access the relevant weather information from the data object
    const weather = data.weather[0];
    const temperature = data.main.temp;
    const humidity = data.main.humidity;

    // Log the weather information to the console
    console.log(
      `The current weather in ${city} is ${weather.description} with a temperature of ${temperature} K and a humidity of ${humidity}%.`
    );
  })
  .catch((error) => {
    // Handle any errors that may occur during the fetch
    console.error("Error fetching weather data:", error);
  });

function showCountryDetails(country) {
  const modalBody = modal.querySelector(".modal-body");
  const modalImg = modal.querySelector("img");

  modalImg.src = country.flag;

  modalBody.innerHTML = `
        <h2>${country.name}</h2>
        <p>
            <strong>Native Name:</strong>
            ${country.nativeName}
        </p>
        <p>
            <strong>Population:</strong>
            ${country.population}
        </p>
        <p>
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region:</strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
        <p>
            <strong>Top Level Domain:</strong>
            ${country.topLevelDomain[0]}
        </p>
        <p>
            <strong>Currencies:</strong>
            ${country.currencies.map((currency) => currency.code)}
        </p>
        <p>
            <strong>Languages:</strong>
            ${country.languages.map((language) => language.name)}
        </p>
    `;
}

// toggle theme - dark & light
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// show and hide the filters (li tags)
filterBtn.addEventListener("click", () => {
  filterBtn.classList.toggle("open");
});

// close the modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

searchEl.addEventListener("input", (e) => {
  const { value } = e.target;
  const countryName = document.querySelectorAll(".country-name");

  countryName.forEach((name) => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      // .card -> .card-body -> .country-name
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});

// add a filter on the li's inside the .dropdown
regionFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const value = filter.innerText;
    const countryRegion = document.querySelectorAll(".country-region");

    countryRegion.forEach((region) => {
      if (region.innerText.includes(value) || value === "All") {
        // .card -> .card-body -> .country-region
        region.parentElement.parentElement.style.display = "block";
      } else {
        region.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
