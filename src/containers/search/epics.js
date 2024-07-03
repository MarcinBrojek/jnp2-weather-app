import { ofType, combineEpics } from "redux-observable";
import { map, switchMap, filter } from "rxjs/operators";
import { from } from "rxjs";
import { map as ramdaMap, unnest } from "ramda";

import { SEARCH_FORECAST, SEARCH_MATCHING_CITIES, SET_FORECAST_OPTION } from "./const";
import { searchForecast, setMatchingCities } from "./actions";
import { updateWeather } from "../weather/actions";
import { theSameRealtime, theSameDay, theSameHour, safeGet } from "../../weather-logic/logic";
import { searchCitySelector, searchAllMatchingCitiesSelector, searchRealtimeTriggerIdSelector } from "./selectors";
import { getDailyWeather, getHourlyWeather, getRealtimeWeather, getMatchingCities, getGifs } from "./api";
import { FORECAST_OPTION } from "../../weather-logic/const";
import { weatherSelector } from "../weather/selectors";

const getPromiseAllMatchingCities = (stateValue, city) => {
    let cached = searchAllMatchingCitiesSelector(stateValue)[city];
    if (cached === undefined) {
        return getMatchingCities(city).then((matchingCities) => ({city, matchingCities}));
    }
    return Promise.resolve(cached).then((matchingCities) => ({city, matchingCities}));
};

const searchMatchingCitiesEpic = (action$, state$) => action$.pipe(
    ofType(SEARCH_MATCHING_CITIES),
    switchMap( ({ city }) => from(
        getPromiseAllMatchingCities(state$.value, city)
    ).pipe(
        map(({ city, matchingCities }) => setMatchingCities(city, matchingCities))
    ))
);

const setForecastOptionEpic = (action$, state$) => action$.pipe(
    ofType(SET_FORECAST_OPTION),
    map(({ forecastOption }) => ({ forecastOption, city: searchCitySelector(state$.value) })),
    map(({ forecastOption, city }) => (searchForecast(city, forecastOption, searchRealtimeTriggerIdSelector(state$.value) + 1)))
);

const findSearchData = (stateValue, forecastOption, city, realtimeTriggerId) => {
    const optionApiAndTimeDelta = {
        [FORECAST_OPTION.REALTIME]: [getRealtimeWeather, theSameRealtime],
        [FORECAST_OPTION.HOURLY]: [getHourlyWeather, theSameHour],
        [FORECAST_OPTION.DAILY]: [getDailyWeather, theSameDay]
    };

    let api, timer;
    [api, timer] = optionApiAndTimeDelta[forecastOption];
    let data = safeGet(weatherSelector(stateValue), [forecastOption, city], undefined);

    let resultData = data;
    if (data === undefined) {
        resultData = api(city);
    } else {
        let lastDate = data['timeStamp'], newDate = new Date();
        if (!timer(lastDate, newDate)) {
            resultData = api(city);
        }
    }

    return resultData.then((value) => {
        value.city = city;
        value.forecastOption = forecastOption;
        let distinctConditionsTexts = Array.from(new Set(
            unnest(ramdaMap((element) => element['condition']['text'], value.data))
        ));
        let gifs = distinctConditionsTexts.reduce(
            (acc, val) => acc.then(
                (gifList) => getGifs(
                    val
                ).then((gif) => {
                    gifList.push(gif); return gifList;
                }).catch((err) => {
                    console.log("[ERROR] getGif: Promise reject " + err);
                })
            ),
            Promise.resolve([])
        );
        return gifs.then((resolvedGifs) => {
            value.gifs = unnest(resolvedGifs);
            return {searchData: value, realtimeTriggerId: realtimeTriggerId};
        });
    }).catch((err) => {
        console.log("[ERROR] findSearchData: Promise reject " + err);
        return undefined;
    });
}

const searchForecastEpic = (action$, state$) => action$.pipe(
    ofType(SEARCH_FORECAST),
    filter(({ realtimeTriggerId }) => searchRealtimeTriggerIdSelector(state$.value) === realtimeTriggerId),
    switchMap(({ city, forecastOption, realtimeTriggerId }) => from(
        findSearchData(state$.value, forecastOption, city, realtimeTriggerId)
    ).pipe(
        map(({ searchData, realtimeTriggerId }) => (updateWeather(searchData, realtimeTriggerId)))
    ))
);

export const searchEpics = combineEpics(
    searchMatchingCitiesEpic,
    setForecastOptionEpic,
    searchForecastEpic
);