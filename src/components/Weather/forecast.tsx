import React from "react";
import moment from 'moment';
import '../styles.css';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Forecast(props: any, {weatherData}: {weatherData: any}) {

  const { forecast } = props;

  const results = forecast.map((item: any, index: number) => {
    let weatherIcon = null;
    if (item.description === 'Thunderstorm') {
      weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    }else if (item.description === 'Drizzle') {
      weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
    } else if (item.description === 'Rain') {
      weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (item.description === 'Snow') {
      weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (item.description === 'Clear') {
      weatherIcon = <FontAwesomeIcon icon={faSun} />;
    } else if (item.description === 'Clouds') {
      weatherIcon = <FontAwesomeIcon icon={faCloud} />;
    } else {
      weatherIcon = <FontAwesomeIcon icon={faSmog} />;
    }

    return (
      <div key={index} className="forecast mb-2">
        <div className="flex-forecast">
        <p>{moment(item.dt_txt).format("dddd")}</p>
        <span>{weatherIcon}</span>
        <p>
          {item.main.temp}&nbsp;&deg;C
        </p>
        </div>
      </div>
    )
  })
  
  return(
    <div>
      <h3>Forecast</h3>
      <div className="d-flex align-items-stretch overflow-auto">{results}</div>
    </div>
  );
  
}
