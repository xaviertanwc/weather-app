import React, { createContext, useState, useRef } from 'react';
import '../../App.css';
import './home.css'
import SearchBar from '../search-bar/search-bar';
import { format, isBefore } from 'date-fns';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const secondsToMilliseconds = 1000;
const minuteToSeconds = 60;
const successCode = 200;

const MyContext = createContext();

function AppHome({ updateBackground }) {
  const [errorRequest, setErrorRequest] = useState('');
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [bright, setBright] = useState(true);

  const childRef = useRef();

  const handleWeather = (response) => {
    if (response.cod === successCode) {
      setWeatherHistory(current => [{...response, dateTime: format(new Date((response.dt + (new Date().getTimezoneOffset() * minuteToSeconds) + response.timezone) * secondsToMilliseconds), 'dd-MM-yyyy hh:mm a')}, ...current.filter((prevWeather) => prevWeather?.id !== response.id)]);
      setErrorRequest('')
      updateBackground(isBright(response));
      setBright(isBright(response));
    } else {
      setErrorRequest(response.message);
    }
  }

  const isBright = (weather) => {
    if (weather.dt < weather.sys.sunrise || weather.dt > weather.sys.sunset) {
      return false;
    }

    const brightWeather = ["clear", "clouds", "fog"];

    if (brightWeather.findIndex(weatherType => weatherType === weather.weather[0].main.toLowerCase()) < 0) {
      return false;
    }

    return true;
  }

  const deleteHistoricalWeather = (indexToDelete) => {
    setWeatherHistory(current => [...current.filter((prevWeather, index) => index !== indexToDelete)]);
  }

  return (
    <div className='Home'>
      <SearchBar ref={childRef} retrieveWeather={handleWeather} isBright={bright} />
      <div className='SearchResult' style={{background: bright? '' : 'rgba(26, 26, 26, 0.30)'}}>
        {!errorRequest ? weatherHistory.length > 0 ? (
          <div>
            <img src={require((isBright(weatherHistory[0]) && weatherHistory[0]?.weather[0]?.main.toLowerCase() === 'clear')? '../../assets/images/sun.png' : '../../assets/images/cloud.png')} alt="fireSpot"/>
            <div className='CurrentSearchContainer'>
              <div style={{color: bright? '' : '#fff'}}>Today's Weather</div>
              <div className='MainTemp' style={{color: bright? '' : '#fff'}}>{Math.round(parseFloat(weatherHistory[0]?.main?.temp))}&#176;</div>
              <div style={{color: bright? '' : '#fff'}}>
                H: {Math.round(parseFloat(weatherHistory[0]?.main?.temp_max))}&#176;
                L: {Math.round(parseFloat(weatherHistory[0]?.main?.temp_min))}&#176;
              </div>
              <div 
                className='OtherDetails'
                style={{color: (bright? '#666' : '#fff')}}
                >
                <div className='CityCountryText'>{weatherHistory[0]?.name}, {weatherHistory[0]?.sys?.country}</div>
                <div className='OtherWeatherDetails'>{weatherHistory[0]?.dateTime}</div>
                <div className='OtherWeatherDetails'>Humidity: {weatherHistory[0]?.main?.humidity}%</div>
                <div className='OtherWeatherDetails'>{weatherHistory[0]?.weather?.length? weatherHistory[0]?.weather[0].main : ''}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className='NoSearchHistoryText'>No Search History</div>
        ) : (
          <div className='ErrorText'>City Not Found</div>
        )}
        <div className='SearchHistory' style={{background: bright? '' : 'rgba(26, 26, 26, 0.30)'}}>
          <span style={{color: bright? '' : '#fff'}}>Search History</span>
          {weatherHistory.map((prevWeather, index) => {
            return (
              <div className='HistoricalWeatherContainer' style={{background: bright? '' : 'rgba(26, 26, 26, 0.50)'}} key={index}>
                <span style={{color: bright? '' : '#fff'}}>{prevWeather.name}, {prevWeather.sys.country}</span>
                <div className='ButtonContainer'>
                  <span style={{color: bright? '' : 'rgba(255, 255, 255, 0.50'}}>{prevWeather.dateTime}</span>
                  <Button onClick={() => childRef.current.fetchPrevWeather(prevWeather.coord.lat, prevWeather.coord.lon)}>
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
