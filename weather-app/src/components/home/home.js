import React, { createContext, useState } from 'react';
import '../../App.css';
import './home.css'
import SearchBar from '../search-bar/search-bar';
import { format } from 'date-fns';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyContext = createContext();

function AppHome() {
  const [weather, setWeather] = useState({});
  const [errorRequest, setErrorRequest] = useState('');
  const [weatherHistory, setWeatherHistory] = useState([]);

  const handleWeather = (response) => {
    if (response.cod === 200) {
      setWeather({...response, dateTime: format(new Date(), 'dd-MM-yyyy hh:mm a')});
      setWeatherHistory(current => [{...response, dateTime: format(new Date(), 'dd-MM-yyyy hh:mm a')}, ...current.filter((prevWeather) => prevWeather?.coord?.lat !== response.coord.lat && prevWeather?.coord?.lon !== response.coord.lon)]);
      setErrorRequest('')
    } else {
      setErrorRequest(response.message);
    }
  }

  const deleteHistoricalWeather = (indexToDelete) => {
    setWeatherHistory(current => [...current.filter((prevWeather, index) => index !== indexToDelete)]);
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
              <div className='OtherWeatherDetails'>{weather?.dateTime}</div>
              <div className='OtherWeatherDetails'>Humidity: {weather?.main?.humidity}%</div>
              <div className='OtherWeatherDetails'>{weather?.weather?.length? weather?.weather[0].main : ''}</div>
            </div>
          </div>
        ) : (
          <div></div>
        ) : (
          <div className='ErrorText'>City Not Found</div>
        )}
        <div className='SearchHistory'>
          <span>Search History</span>
          {weatherHistory.map((prevWeather, index) => {
            return (
              <div className='HistoricalWeatherContainer' key={index}>
                {prevWeather.name}, {prevWeather.sys.country}
                <div className='ButtonContainer'>
                  {prevWeather.dateTime}
                  <Button>
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                  </Button>
                  <Button onClick={() => deleteHistoricalWeather(index)}>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default AppHome;
