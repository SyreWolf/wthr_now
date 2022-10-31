import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

import WeatherDetails from '../components/weather_details';
import MainInfo from '../components/main_info';

const WTHR = (props) => {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('Madrid')
  const [background, setBackground] = useState({daytime: null, weather: null })

  const commonWeather = ['Clear', 'Clouds', 'Rain', 'Thunderstorm', 'Drizzle', 'Snow', 'Mist'];

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=25630b85434111ac51b0c8db0eef1c51`
  const bg_image = `/bg_images/${background.daytime}/${background.weather}.jpg`

  const setDaytime = (daytime, sunset, sunrise) => {
    if(daytime < sunset && daytime >= sunrise){
      return 'day';
    }

    return 'night'
  }

  const setWeather = (weather) => {
    if(commonWeather.includes(weather)){
      return weather;
    }
    
    return 'Mist';
  }

  const setBgImage = (weatherData) => {  
    setBackground(
      { 
        daytime: setDaytime(weatherData.dt, weatherData.sys.sunset, weatherData.sys.sunrise), 
        weather: setWeather(weatherData.weather[0].main) 
      }
    );
  }

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        setBgImage(response.data)
      }).catch((error) => {
        toast(`Oops! Looks like that place doesn't exist. Try again with another place`);
      });
      
      setLocation('')
    }
  }

  useEffect(() => {
    searchLocation({ key: 'Enter' });
  }, []);

  return (
    <>
      <img src={background.weather && background.daytime && bg_image} className={`w-full h-screen fixed bg-center bg-no-repeat bg-cover z-10 animate__animated animate__fadeIn`}/>
      <div className="relative w-full h-screen bg-black/50 z-20 animate__animated animate__fadeIn">
        <h3 className="float-left top-10 left-14 absolute text-2xl text-white/90 font-bold tracking-[0.35rem] animate__animated animate__fadeIn delay-1">wthr_now.</h3>
        <div className="flex flex-col gap-y-12 w-[25%] h-screen bg-[#ffffff]/10 border border-[#ffffff]/10 shadow-lg backdrop-blur-md float-right py-6 px-10 animate__animated animate__fadeIn delay-3">
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter location...'
            type="text" 
            className="w-full bg-[#ffffff]/0 outline-0 border-b border-b-[#ffffff]/50 text-lg font-medium text-white py-3 px-5 input"
          />
          {data.main ? 
            <WeatherDetails 
              data={[
                { label: 'Feels Like', value: `${data.main.feels_like.toFixed()}°` },
                { label: 'Min/Max Temp', value: `${data.main.temp_min.toFixed()}° - ${data.main.temp_max.toFixed()}°` },
                { label: 'Humidity', value: `${data.main.humidity}%` },
                { label: 'Wind', value: `${data.wind.speed.toFixed()}km/h` },
                { label: 'Cloudiness', value: `${data.clouds.all.toFixed()}%` }
              ]}
            />
          : null}
        </div>
        {data.main && data.weather ? 
          <MainInfo
            temp={`${data.main.temp.toFixed()}°`}
            location={data.name}
            icon={data.weather[0].icon}
            weather={data.weather[0].main}
          />
        : null}
      </div>
    </>
  );
}

export default WTHR;
