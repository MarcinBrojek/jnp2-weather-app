import { get } from 'axios';
import { isNil, map } from "ramda";

const apiBaseURL = 'http://api.weatherapi.com/v1';
const apiKey = '3f9348b594504c4598c123209212208';
const apiMethodAutocomplete = '/search.json';
const apiMethodRealtime = '/current.json';
const apiMethodForecast = '/forecast.json';
const apiAqi = 'no';
const apiDailyDays = '3';
const apiHourlyDays = '1';
const apiAlerts = 'no';

const apiTenorURL = 'https://g.tenor.com/v1/search';
const apiTenorKey = 'LIVDSRZULELA';

export const getMatchingCities = async (city) => {
    const api = apiBaseURL + apiMethodAutocomplete;
    let response = null;
    if (city !== "") {
        response = await get(api, {
            params: {
                key: apiKey,
                q: city
            }
        });
    } else {
        response = {data: []};
    }

    let responseData = response.data;
    if (isNil(responseData)) {
        console.log('autocomplete api - no response');
        return {};
    }

    let matchingCities = map(({ name }) => (name), responseData);
    matchingCities.push('my localization');
    return matchingCities;
};

export const getRealtimeWeather = async (city) => {
    const api = apiBaseURL + apiMethodRealtime;
    const response = await get(api, {
        params: {
            key: apiKey,
            q: city,
            aqi: apiAqi
        }
    });

    let responseData = response.data;
    if (isNil(responseData)) {
        console.log('realtime api - no response');
        return {};
    }

    return {
        timeStamp: new Date(),
        data: [responseData['current']]
    }
};

export const getDailyWeather = async (city) => {
    const api = apiBaseURL + apiMethodForecast;
    const response = await get(api, {
        params: {
            key: apiKey,
            q: city,
            days: apiDailyDays,
            aqi: apiAqi,
            alerts: apiAlerts
        }
    });

    let responseData = response.data;
    if (isNil(responseData)) {
        console.log('daily api - no response');
        return {};
    }

    return {
        timeStamp: new Date(),
        data: map(({ date, day }) => ({ date, ...day }) , responseData['forecast']['forecastday'])
    }
};

export const getHourlyWeather = async (city) => {
    const api = apiBaseURL + apiMethodForecast;
    const response = await get(api, {
        params: {
            key: apiKey,
            q: city,
            days: apiHourlyDays,
            aqi: apiAqi,
            alerts: apiAlerts
        }
    });

    let responseData = response.data;
    if (isNil(responseData)) {
        console.log('hourly api - no response');
        return {};
    }

    return {
        timeStamp: new Date(),
        data: responseData['forecast']['forecastday'][0]['hour']
    }
};

export const getGifs = async (weatherDescription) => {
    const response = await get(apiTenorURL, {
        params: {
            key: apiTenorKey,
            q: weatherDescription,
            ar_range: 'standard'
        }
    });
    let responseResult = response.data.results;
    if (isNil(responseResult)) {
        console.log('gif api - no response');
        return {};
    }

    return map((element) => (element['media'][0]['gif']['url']), responseResult);
};
