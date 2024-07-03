export const FORECAST_OPTION = {
    REALTIME: 'realtime',
    DAILY: 'daily',
    HOURLY: 'hourly'
}
export const DEFAULT_FORECAST_OPTION = FORECAST_OPTION.REALTIME;

export const MODE_OPTION = {
    LIGHT: 'light',
    DARK: 'dark'
}
export const DEFAULT_MODE = MODE_OPTION.LIGHT;

export const REALTIME_REFRESH_TIME = 15 * 60 * 1000;
export const GIF_REFRESH_TIME = 30 * 1000;

export const HOUR_TIME = 3600 * 1000;
export const DAY_TIME = 24 * 3600 * 1000;

export const DEFAULT_LOAD = false;

export const temperatureFieldNames = { // minTemp, maxTemp, avgTemp
    [FORECAST_OPTION.REALTIME]: ['temp_c', 'temp_c', 'temp_c'],
    [FORECAST_OPTION.DAILY]: ['mintemp_c', 'maxtemp_c', 'avgtemp_c'],
    [FORECAST_OPTION.HOURLY]: ['temp_c', 'temp_c', 'temp_c'],
}