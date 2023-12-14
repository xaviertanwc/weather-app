import axios from "axios";

const restCountriesUrl = axios.create({
    baseURL: 'https://restcountries.com/v3.1/'
});

const openWeatherMapUrl = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

const geoDbUrl = axios.create({
    baseURL: 'http://geodb-free-service.wirefreethought.com/v1/'
})

const openWeatherMapApiKey = 'b8918f68e4937c5614be5fa4a3b23bf0';

export const getAllCountries = ()  => {
    let result = restCountriesUrl
        .get("all?fields=altSpellings,name,cca2")
        .then((response) => {
            response.data.sort((countryA, countryB) => countryA.name.common.localeCompare(countryB.name.common));
            return response.data;
        })
        .catch((error) => {
            return error;
        });

    return result;
}

export const getWeatherByLatLon = (lat, lon) => {
    let result = openWeatherMapUrl
        .get("weather?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherMapApiKey)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });

    return result;
}

export const getWeatherByCityAndCountry = (cityName, countryCode) => {
    let result = openWeatherMapUrl
        .get("weather?q=" + cityName + (countryCode? "," + countryCode : "") + "&appid=" + openWeatherMapApiKey + "&units=metric")
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });

    return result;
}

export const getCityByPrefixAndCountry = (city, countryCode) => {
    let result = geoDbUrl
        .get("geo/places?limit=10&offset=0&types=CITY&namePrefix=" + city + (countryCode? "&countryIds=" + countryCode : ""))
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            return error;
        });

    return result;
}