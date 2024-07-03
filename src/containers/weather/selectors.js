import { createSelector } from 'reselect';
import { prop } from 'ramda';

import { WEATHER_REDUCER_NAME } from "./reducer";

const getWeatherReducerState = prop(WEATHER_REDUCER_NAME);

export const weatherSelector = createSelector(
    getWeatherReducerState,
    (weather) => weather
);

export const weatherDataSelector = createSelector(
    weatherSelector,
    (weather) => weather.get('data')
);

export const weatherGifTriggerIdSelector = createSelector(
    weatherSelector,
    (weather) => weather.get('gifTriggerId')
);

export const weatherGifsSelector = createSelector(
    weatherSelector,
    (weather) => weather.get('gifs')
);

export const weatherGifNumberSelector = createSelector(
    weatherSelector,
    (weather) => weather.get('gifNumber')
);