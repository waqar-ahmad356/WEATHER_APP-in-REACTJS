import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assests/search.png';
import drizzle_icon from '../Assests/drizzle.png';
import humidity_icon from '../Assests/humidity.png';
import rain_icon from '../Assests/rain.png';
import snow_icon from '../Assests/snow.png';
import wind_icon from '../Assests/wind.png';
import clear_icon from '../Assests/clear.png';
import cloud_icon from '../Assests/cloud.png';

const WeatherApp = () => {
    let api_key = 'a77b9d38421dea8e67444591f664927e';
    const [wicon,setWicon]=useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName('cityInput');
        if (element[0].value === "") {
            return 0;
        }

        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
            let response = await fetch(url);
            let data = await response.json();

            const humidity = document.getElementsByClassName('humidity-percentage');
            const wind_speed = document.getElementsByClassName('wind-speed');
            const location = document.getElementsByClassName('weather-location');
            const temperature = document.getElementsByClassName('weather-temp');

            humidity[0].innerHTML = data.main.humidity + " %";
            wind_speed[0].innerHTML = data.wind.speed + " Km/h";
            location[0].innerHTML = data.name;
            temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";

            if (data.weather[0].icon==='01d' || data.weather[0].icon==='01n'){
                setWicon(clear_icon);
            }
            else if (data.weather[0].icon==='02d' || data.weather[0].icon==='02n'){
                setWicon(cloud_icon);
            }
            else if (data.weather[0].icon==='03d' || data.weather[0].icon==='03n'){
                setWicon(cloud_icon);
            }
            else if (data.weather[0].icon==='04d' || data.weather[0].icon==='04n'){
                setWicon(cloud_icon);
            }
            else if (data.weather[0].icon==='09d' || data.weather[0].icon==='09n'){
                setWicon(rain_icon);
            }
            else if (data.weather[0].icon==='10d' || data.weather[0].icon==='10n'){
                setWicon(rain_icon);
            }
            else if (data.weather[0].icon==='11d' || data.weather[0].icon==='11n'){
                setWicon(drizzle_icon);
            }
            else if (data.weather[0].icon==='13d' || data.weather[0].icon==='13n'){
                setWicon(snow_icon);
            }
            else  {
                setWicon(clear_icon);
            }

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <input className='cityInput' type='text' placeholder='search' />
                <div className='search-icon' onClick={() => { search() }}>
                    <img className='search-icon' src={search_icon} alt='search icon' />
                </div>
            </div>
            <div className='weather-img'>
                <img src={wicon} alt='cloud icon' className='cloud-icon' />
            </div>
            <div className='weather-temp'>Temperature: </div>
            <div className='weather-location'>Location: </div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} className='icon' alt='' />
                    <div className='data'>
                        <div className='humidity-percentage'></div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} className='icon' alt='' />
                    <div className='data'>
                        <div className='wind-speed'></div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
