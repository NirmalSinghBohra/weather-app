import AXIOS from "axios";

function publicInstance() {
    return AXIOS.create({
        // @ts-ignore
        accept: "application/json",
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
}


function handleErrors(error: any) {
    let message = "Something went wrong!!";
    if (error && error.response && error.response.data) {
        const data = error.response.data;
        if (data.error) {
            message = data.error;
        } else if (data.message) {
            const keys = Object.keys(data.message);
            if (keys.length) {
                message = data.message[keys[0]];
            }
        }
    }
    return message;
}


async function fetchWeatherByCityName(cityName: string) {
    const instance = publicInstance();
    return await instance.get(`/weather/?q=${cityName}&APPID=${process.env.REACT_APP_API_KEY}`);
}

async function fetchForecastByCityName(cityName: string) {
    const instance = publicInstance();
    return await instance.get(`/forecast/?q=${cityName}&APPID=${process.env.REACT_APP_API_KEY}`);
}


const API_SERVICE = {
    handleErrors,
    fetchWeatherByCityName,
    fetchForecastByCityName
};

export default API_SERVICE;
