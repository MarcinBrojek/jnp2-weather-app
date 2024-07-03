import { UPDATE_WEATHER, GIF_TRIGGER} from "./const";

export const updateWeather = (searchData, realtimeTriggerId) => ({
    type: UPDATE_WEATHER,
    searchData,
    realtimeTriggerId
});

export const gifTrigger = (gifTriggerId) => ({
    type: GIF_TRIGGER,
    gifTriggerId
})