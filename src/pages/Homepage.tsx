import React, { useEffect, useState } from "react";
import API_SERVICE from "../services/api-service";
import Weather from '../components/Forecast/weather';
import Forecast from '../components/Weather/forecast';
import {Button, Form, InputGroup} from "react-bootstrap";
import "./index.scss";

export default function Homepage() {
    const [cityName, setCityName] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState({} as any);
    const [forecastData, setForecastData] = useState([]);

    const handleChange = (event: any) => {    setCityName(event.target.value);  }

    const getWeatherByCityName = async () => {
        setLoading(true);
        try {
            const {data: data} = await API_SERVICE.fetchWeatherByCityName(cityName);
            setWeatherData(data);
            getForecastByCityName();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const getForecastByCityName = async () => {
        try {
            const {data: data} = await API_SERVICE.fetchForecastByCityName(cityName);
            setForecastData(data.list);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        getWeatherByCityName();
    }, [])

    return (
        <div className="layout">
            <div className="searchbox">
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="City Name"
                        value={cityName}
                        onChange={handleChange}
                    />
                    <Button disabled={loading} variant="outline-secondary" onClick={getWeatherByCityName}>
                        Search
                    </Button>
                </InputGroup>
            </div>
            {(loading) ? (
                <div>
                    Fetching data...
                </div>
            ) : (
                typeof weatherData.main != 'undefined' && <div>
                    <Weather weatherData={weatherData}/>
                    <Forecast forecast={forecastData} weatherData={weatherData}/>
                </div>
            )}
        </div>
    );
}
