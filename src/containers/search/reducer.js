import { fromJS } from 'immutable';
import { max } from "ramda";

import { DEFAULT_FORECAST_OPTION, DEFAULT_LOAD } from "../../weather-logic/const";
import { SET_FORECAST_OPTION, SET_MATCHING_CITIES, SEARCH_FORECAST, DISABLE_LOADER } from "./const";

export const SEARCH_REDUCER_NAME = 'Search';

const initialState = fromJS({
    city: '',
    forecastOption: DEFAULT_FORECAST_OPTION,
    allMatchingCities: {
        '': ['my localization']
    },
    loading: DEFAULT_LOAD,
    realtimeTriggerId: 0
});

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FORECAST_OPTION:
            return state.set('forecastOption', action.forecastOption);
        case SET_MATCHING_CITIES:
            return state.setIn(['allMatchingCities', action.city], action.matchingCities).set('city', action.city);
        case SEARCH_FORECAST:
            return state.set('loading', true).update('realtimeTriggerId', (realtimeTriggerId) => max(realtimeTriggerId, action.realtimeTriggerId));
        case DISABLE_LOADER:
            return state.set('loading', false);
        default:
            return state;
    }
};