import { SET_FORECAST_OPTION, SEARCH_MATCHING_CITIES, SEARCH_FORECAST, SET_MATCHING_CITIES, DISABLE_LOADER } from './const'

export const setForecastOption = (forecastOption) => ({
    type: SET_FORECAST_OPTION,
    forecastOption
});

export const setMatchingCities = (city, matchingCities) => ({
    type: SET_MATCHING_CITIES,
    city,
    matchingCities
});

export const searchMatchingCities = (city) => ({
    type: SEARCH_MATCHING_CITIES,
    city
});

export const searchForecast = (city, forecastOption, realtimeTriggerId) => ({
    type: SEARCH_FORECAST,
    city,
    forecastOption,
    realtimeTriggerId
});

export const disableLoader = () => ({
    type: DISABLE_LOADER
});