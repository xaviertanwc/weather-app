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

  useEffect(() => {
    setWeather({});
  }, []);

  const handleWeather = (response) => {
    if (response.cod === 200) {
      console.log(response)
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
        {!errorRequest ? (
          <div>
            <img src={require('../../assets/images/cloud.png')} alt="fireSpot"/>
            <div>{weather?.main?.temp}</div>
            <div>{weather?.main?.temp_max}</div>
            <div>{weather?.main?.temp_min}</div>
            <div>{weather?.name}</div>
            <div>{weather?.sys?.country}</div>
            <div>{weather?.main?.humidity}</div>
            <div>{weather?.weather?.length? weather?.weather[0].main : ''}</div>
          </div>
        ) : (
          <div>{errorRequest}</div>
        )}
      </div>
    </div>
  );
}

export default AppHome;
