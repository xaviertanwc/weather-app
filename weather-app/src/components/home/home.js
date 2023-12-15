import React, { createContext, useEffect, useState } from 'react';
import '../../App.css';
import './home.css'
import { useForm } from 'react-hook-form';
import { Button, Input, Form, List, Select, AutoComplete } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMultiply } from '@fortawesome/free-solid-svg-icons'
import { getAllCountries, getWeatherByLatLon, getCityByPrefixAndCountry, getWeatherByCityAndCountry } from '../request/request';
import SearchBar from '../search-bar/search-bar';

const MyContext = createContext();

function AppHome() {
  const [weather, setWeather] = useState({});
  const [errorRequest, setErrorRequest] = useState('');

  const handleWeather = (response) => {
    if (response.cod === 200) {
      setWeather(response);
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
              <div className='full-column'>{Math.round(parseFloat(weather?.main?.temp))}</div>
              <div className='full-column'>
                <div>{Math.round(parseFloat(weather?.main?.temp_max))}</div>
                <div>{Math.round(parseFloat(weather?.main?.temp_min))}</div>
              </div>
              <div>{weather?.name}</div>
              <div>{weather?.sys?.country}</div>
              <div>{weather?.main?.humidity}</div>
              <div>{weather?.weather?.length? weather?.weather[0].main : ''}</div>
            </div>
          </div>
        ) : (
          <div></div>
        ) : (
          <div>{errorRequest}</div>
        )}
      </div>
    </div>
  );
}

export default AppHome;
