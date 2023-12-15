import React, { useEffect, useState } from 'react';
import '../../App.css';
import './search-bar.css'
import { useForm } from 'react-hook-form';
import { Button, Input, Form, List, Select, AutoComplete } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMultiply } from '@fortawesome/free-solid-svg-icons'
import { getAllCountries, getWeatherByLatLon, getCityByPrefixAndCountry, getWeatherByCityAndCountry } from '../request/request';

function SearchBar({retrieveWeather}) {
    const [form] = Form.useForm();
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [weather, setWeather] = useState({});
    const [errorRequest, setErrorRequest] = useState(false);

    useEffect(() => {
        setCountries([]);
        setCities([]);
        
        fetchCountries();
      },[])

    async function fetchCountries() {
        const response = await getAllCountries();
        response.errors ? setErrorRequest(true) : setCountries(response);
    }


    const filterOptions = (input, option) => {
        if (input) {
            return option.children.toLowerCase().includes(input.toLowerCase());
        }
        return true;
    }

    const setCountryValue = (value) => {
        form.setFieldValue('country', countries[value]);
    }


    const onClear = () => {
        form.resetFields();
    }

    async function fetchWeather(cityName, countryCode) {
        const response = await getWeatherByCityAndCountry(cityName, countryCode);
        retrieveWeather(response);
    }

    const onSubmit = () => {
        const city = form.getFieldValue('city');
        const country = form.getFieldValue('country');

        fetchWeather(city, country?.cca2)
    }

    return(
        <div className='SearchBar'>
        <Form form={form} autoComplete='off'>
            <Form.Item name='city'>
              <div className='SearchContainer'>
                <div className='SearchLabel'>City</div>
                <Input className='SearchInput'></Input>
              </div>
            </Form.Item>    
            <Form.Item name='country'>
              <div className='SearchContainer'>
                <div className='SearchLabel'>Country</div>
                <Select
                  className='SearchSelect'
                  showSearch
                  suffixIcon={null}
                  bordered={false}
                  filterOption={filterOptions}
                  placement='bottomRight'
                  onSelect={setCountryValue}
                  >
                    {countries.map((country, index) => 
                      <Select.Option key={index} value={index}>
                        {country.name.common}
                      </Select.Option>
                    )}
                </Select>
              </div>
            </Form.Item>    
            <div className='SearchButtonContainer'>
              <Button className='SearchButton' onClick={onSubmit}>
                <FontAwesomeIcon className='SearchIcon' icon={faSearch}></FontAwesomeIcon>
              </Button>
              <Button className='SearchButton' onClick={onClear}>
                <FontAwesomeIcon className='SearchIcon' icon={faMultiply}></FontAwesomeIcon>
              </Button>
            </div>
        </Form>
      </div>
    )
}

export default SearchBar;