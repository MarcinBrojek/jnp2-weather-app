import { fromJS } from 'immutable';

import { GIF_TRIGGER, UPDATE_WEATHER } from "./const";
import { FORECAST_OPTION } from "../../weather-logic/const";

export const WEATHER_REDUCER_NAME = 'Weather';

const initialState = fromJS({
    data: {},
    [FORECAST_OPTION.REALTIME]: {},
    [FORECAST_OPTION.DAILY]: {},
    [FORECAST_OPTION.HOURLY]: {},
    gifTriggerId: 0,
    gifs: [],
    gifNumber: 0
});

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_WEATHER:
            return state.set('gifTriggerId', action.realtimeTriggerId
            ).setIn([action.searchData.forecastOption, action.searchData.city], action.searchData.data
            ).set('data', action.searchData.data
            ).set('gifNumber', 0
            ).set('gifs', action.searchData.gifs)
        case GIF_TRIGGER:
            if (action.gifTriggerId === state.gifTriggerId) {
                return state.update('gifNumber', (gifNumber) => (gifNumber + 1) % state.get('gifs').length);
            }
            return state;
        default:
            return state;
    }
};