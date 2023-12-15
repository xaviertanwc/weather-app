import React, { createContext, useState } from 'react';
import '../../App.css';
import './home.css'
import SearchBar from '../search-bar/search-bar';
import { format } from 'date-fns';

const MyContext = createContext();

function AppHome() {
  const [weather, setWeather] = useState({});
  const [errorRequest, setErrorRequest] = useState('');

  const handleWeather = (response) => {
    if (response.cod === 200) {
      setWeather({...response, dateTime: format(new Date(), 'dd-MM-yyyy hh:mm a')});
      console.log(weather);
      setErrorRequest('')
    } else {
      setErrorRequest(response.message);
    }
  }

  return (
    <div className='Home'>
      <SearchBar retrieveWeather={handleWeather}/>
      <div className='SearchResult'>
        {!errorRequest ? weather ? (
          <div>
            <img src={require('../../assets/images/cloud.png')} alt="fireSpot"/>
            <div className='CurrentSearchContainer'>
              <div className='full-column'>Today's Weather</div>
              <div className='full-column MainTemp'>{Math.round(parseFloat(weather?.main?.temp))}&#176;</div>
              <div className='full-column'>
                H: {Math.round(parseFloat(weather?.main?.temp_max))}&#176;
                L: {Math.round(parseFloat(weather?.main?.temp_min))}&#176;
              </div>
              <div className='CityCountryText'>{weather?.name}, {weather?.sys?.country}</div>
              <div className='OtherWeatherDetails'>{weather?.dateTime?.toString()}</div>
              <div className='OtherWeatherDetails'>Humidity: {weather?.main?.humidity}%</div>
              <div className='OtherWeatherDetails'>{weather?.weather?.length? weather?.weather[0].main : ''}</div>
            </div>
          </div>
        ) : (
          <div></div>
        ) : (
          <div className='ErrorText'>{errorRequest}</div>
        )}
      </div>
      <div className='SearchHistory'>

      </div>
    </div>
  );
}

export default AppHome;
