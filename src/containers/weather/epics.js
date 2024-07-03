import { ofType, combineEpics } from "redux-observable";
import { map, filter, delay } from 'rxjs/operators';

import { UPDATE_WEATHER, GIF_TRIGGER } from "./const";
import { gifTrigger } from "./actions";
import { searchForecast, disableLoader } from "../search/actions";
import { GIF_REFRESH_TIME, REALTIME_REFRESH_TIME } from "../../weather-logic/const";
import { searchCitySelector, searchForecastOptionSelector, searchRealtimeTriggerIdSelector } from "../search/selectors";
import { weatherGifTriggerIdSelector } from "./selectors";

const updateWeatherEpic = (action$) => action$.pipe(
    ofType(UPDATE_WEATHER),
    map(() => disableLoader())
);

const realtimeTriggerEpic = (action$, state$) => action$.pipe(
    ofType(UPDATE_WEATHER),
    map(({ realtimeTriggerId }) => ({ realtimeTriggerId: realtimeTriggerId, actualRealtimeTriggerId: searchRealtimeTriggerIdSelector(state$.value) })),
    filter(({ realtimeTriggerId, actualRealtimeTriggerId }) => (realtimeTriggerId === actualRealtimeTriggerId)),
    delay(REALTIME_REFRESH_TIME),
    map(({ realtimeTriggerId }) => searchForecast(searchCitySelector(state$.value), searchForecastOptionSelector(state$.value), realtimeTriggerId))
);

const cycleGifTriggerEpic = (action$, state$) => action$.pipe(
    ofType(GIF_TRIGGER),
    map(({ gifTriggerId }) => ({ gifTriggerId: gifTriggerId, actualGifTriggerId: weatherGifTriggerIdSelector(state$.value) })),
    filter(({ gifTriggerId, actualGifTriggerId }) => (gifTriggerId === actualGifTriggerId)),
    delay(GIF_REFRESH_TIME),
    map(({ gifTriggerId }) => gifTrigger(gifTriggerId))
);

const updateWeatherMakeGifTriggerEpic = (action$) => action$.pipe(
    ofType(UPDATE_WEATHER),
    delay(GIF_REFRESH_TIME),
    map(({ realtimeTrigger }) => gifTrigger(realtimeTrigger))
);

export const weatherEpics = combineEpics(updateWeatherEpic, realtimeTriggerEpic, cycleGifTriggerEpic, updateWeatherMakeGifTriggerEpic);