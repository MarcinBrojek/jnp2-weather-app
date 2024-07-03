import { combineReducers } from 'redux';

import { MODE_REDUCER_NAME, modeReducer } from "./containers/mode/reducer";
import { SEARCH_REDUCER_NAME, searchReducer } from "./containers/search/reducer";
import { WEATHER_REDUCER_NAME, weatherReducer } from "./containers/weather/reducer";

export default function createReducer() {
    return combineReducers({
        [MODE_REDUCER_NAME]: modeReducer,
        [SEARCH_REDUCER_NAME]: searchReducer,
        [WEATHER_REDUCER_NAME]: weatherReducer
    });
}