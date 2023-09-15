import React, { useState } from "react";
import "./WeatherApp.css";
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import rain_icon from "./assets/rain.png";
import snow_icon from "./assets/snow.png";
import dev_logo from "./assets/dev_logo.png";

export const WeatherApp = () => {

    const timer = document.getElementsByClassName('clock');
    const clock = () => {
      let d = new Date();
      let time = d.toLocaleTimeString();
      timer[0].innerHTML = time;
    }
    setInterval(clock, 1000);

    var api_key = '5b699843f527d1572030e83b225a4b66';

    const [wicon,setWicon] = useState(cloud_icon);

    const searchStatus = async () => {
      
        const loader = document.getElementsByClassName('loader');
        loader[0].innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
        const city = document.getElementsByClassName('cityInput');
        if(city[0].value===""){
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city[0].value}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        loader[0].innerHTML = "";
        
        const location = document.getElementsByClassName('location');
        const temperature = document.getElementsByClassName('temperature');
        const weather_type = document.getElementsByClassName('weather-type');
        const feels_like = document.getElementsByClassName('feels-like');
        const wind_speed = document.getElementsByClassName('wind-speed');
        const humidity = document.getElementsByClassName('humidity');
        const visiblity = document.getElementsByClassName('visiblity');
        const pressure = document.getElementsByClassName('pressure');
        
        location[0].innerHTML = data.name+", "+data.sys.country;
        temperature[0].innerHTML = Math.floor(data.main.temp);
        weather_type[0].innerHTML = data.weather[0].main;
        feels_like[0].innerHTML = "Feels like "+data.main.feels_like;
        wind_speed[0].innerHTML = Math.floor(data.wind.speed)+"<span>km/h</span>";
        humidity[0].innerHTML = data.main.humidity+"<span>%</span>";
        visiblity[0].innerHTML = (data.visibility)/1000 + "<span>km</span>";
        pressure[0].innerHTML = data.main.pressure+"<span>mb</span>";

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
          setWicon(clear_icon);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
          setWicon(cloud_icon);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
          setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
          setWicon(clear_icon);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
          setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
          setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
          setWicon(snow_icon);
        }
        else{
          setWicon(clear_icon);
        }


    }

  return (
    <div className="container">
      <div className="header">
        <img src={dev_logo} alt="" />
        <p className="clock"></p>
      </div>
      <div className="search-bar">
        <input type="text" className="cityInput" placeholder="Enter City" />
        <button onClick={searchStatus}>Search</button>
      </div>
      <div className="loader"></div>
      <p className="location">Muzaffarpur, Bihar</p>
      <div className="temp-details">
        <img src={wicon} alt="Weather-Icon" className="temp-icon" />
        <div className="temp">
          <h1 className="temperature">32</h1>
          <p className="temp-desc"><span className="weather-type">Sunny</span><br /><span className="feels-like">Feels like 42</span></p>
        </div>
      </div>
        <div className="other-details">
          <div className="elements">
            <h3>Wind Speed</h3>
            <h1 className="wind-speed">17<span>km/h</span></h1>
            <p>Gentle Breeze</p>
          </div>
          <div className="elements">
            <h3>Humidity</h3>
            <h1 className="humidity">62<span>%</span></h1>
            <p>Satisfactory</p>
          </div>
          <div className="elements">
            <h3>Visiblity</h3>
            <h1 className="visiblity">4<span>km</span></h1>
            <p>Moderate</p>
          </div>
          <div className="elements">
            <h3>Pressure</h3>
            <h1 className="pressure">1003<span>mb</span></h1>
            <p>Satisfactory</p>
          </div>
        </div>
    </div>
  );
};
