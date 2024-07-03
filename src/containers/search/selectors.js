import { createSelector } from 'reselect';
import { prop } from 'ramda';

import { SEARCH_REDUCER_NAME } from "./reducer";

const getSearchReducerState = prop(SEARCH_REDUCER_NAME);

export const searchCitySelector = createSelector(
    getSearchReducerState,
    (search) => search.get('city')
);

export const searchForecastOptionSelector = createSelector(
    getSearchReducerState,
    (search) => search.get('forecastOption')
);

export const searchLoadingSelector = createSelector(
    getSearchReducerState,
    (search) => search.get('loading')
);

export const searchAllMatchingCitiesSelector = createSelector(
    getSearchReducerState,
    (search) => search.get('allMatchingCities')
);

export const searchRealtimeTriggerIdSelector = createSelector(
    getSearchReducerState,
    (search) => search.get('realtimeTriggerId')
);