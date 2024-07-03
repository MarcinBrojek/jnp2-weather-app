import { map } from "ramda";

import { DAY_TIME, DEFAULT_MODE, HOUR_TIME, MODE_OPTION, REALTIME_REFRESH_TIME } from "./const";
import { temperatureFieldNames } from "./const";

export const getOppositeMode = (mode) => {
    switch (mode) {
        case MODE_OPTION.LIGHT:
            return MODE_OPTION.DARK;
        case MODE_OPTION.DARK:
            return MODE_OPTION.LIGHT;
        default:
            return DEFAULT_MODE;
    }
}

export const theSameRealtime = (dateLast, dateNew) => (
    dateNew - dateLast > REALTIME_REFRESH_TIME
);

export const theSameDay = (dateLast, dateNew) => (
    dateLast.getDate() === dateNew.getDate()
    && dateNew - dateLast < DAY_TIME
);

export const theSameHour = (dateLast, dateNew) => (
    dateLast.getHours() === dateNew.getHours()
    && dateNew - dateLast < HOUR_TIME
);

const notInRange = (value, min, max) => (
    value < min || value > max
);

export const scoreTheWeather = (forecastOption, data) => {

    let score = [
        map((element) => safeGet(element, ['condition', 'text']), data).some((text) => (text.includes('ain'))), // (R,r)ain(y)
        (map((element) => element[temperatureFieldNames[forecastOption][0]], data).reduce((minTemp, temp) => (temp < minTemp ? temp : minTemp), 100) < 15)
        || (map((element) => element[temperatureFieldNames[forecastOption][1]], data).reduce((maxTemp, temp) => (temp > maxTemp ? temp : maxTemp), -100) > 30),
        notInRange(map((element) => element[temperatureFieldNames[forecastOption][2]], data).reduce((sumTemp, temp) => (sumTemp + temp), 0) / data.length, 18, 25)
    ].reduce((score, isTrue) => isTrue ? score - 1 : score, 3);

    switch (score) {
        case 3:
            return 'nice';
        case 2:
            return 'passable';
        default:
            return 'not nice';
    }
}

export const safeGet = (obj, keys, def = undefined) => (
    keys.reduce((acc, key) => (acc !== undefined ? (acc[key] || def) : def), obj)
);