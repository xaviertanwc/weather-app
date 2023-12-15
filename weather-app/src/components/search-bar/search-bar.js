import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import '../../App.css';
import './search-bar.css'
import { Button, Input, Form, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMultiply } from '@fortawesome/free-solid-svg-icons'
import { getAllCountries, getWeatherByLatLon, getWeatherByCityAndCountry } from '../request/request';

const SearchBar = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [errorRequest, setErrorRequest] = useState(false);

  useEffect(() => {
    setCountries([]);

    fetchCountries();
  }, [])

  useImperativeHandle(ref, () => ({
    fetchPrevWeather(lat, lon) {
      fetchWeatherByLatLon(lat, lon);
    }
  }))

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
    props.retrieveWeather(response);
  }

  async function fetchWeatherByLatLon(lat, lon) {
    const response = await getWeatherByLatLon(lat, lon);
    props.retrieveWeather(response)
  }

  const onSubmit = () => {
    const city = form.getFieldValue('city');
    const country = form.getFieldValue('country');

    fetchWeather(city, country?.cca2)
  }

  return (
    <div className='SearchBar'>
      <Form form={form} autoComplete='off'>
        <Form.Item name='city'>
          <div className='SearchContainer'>
            <div className='SearchLabel'>City</div>
            <Input className='SearchInput' style={{color: (props.isBright? '' : '#fff')}}></Input>
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
              style={{color: (props.isBright? '' : '#fff')}}
            >
              {countries.map((country, index) =>
                <Select.Option key={index} value={index}  style={{color: (props.isBright? '' : '#fff')}}>
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
})

export default SearchBar;