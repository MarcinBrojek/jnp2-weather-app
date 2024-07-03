import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { map } from "ramda";

import { SearchBarWrapper, ForecastOptionField, InputCityField, SearchAndLoaderField } from "./components"
import { searchCitySelector, searchForecastOptionSelector, searchLoadingSelector, searchAllMatchingCitiesSelector, searchRealtimeTriggerIdSelector } from "./selectors";
import { FORECAST_OPTION } from "../../weather-logic/const";
import { searchForecast, searchMatchingCities, setForecastOption } from "./actions";
import { modeOptionSelector } from "../mode/selectors";

export const Search = () => {
    const city = useSelector(searchCitySelector);
    const forecastOption = useSelector(searchForecastOptionSelector);
    const loading = useSelector(searchLoadingSelector);
    const allMatchingCities = useSelector(searchAllMatchingCitiesSelector);
    const realtimeTriggerId = useSelector(searchRealtimeTriggerIdSelector);
    const mode = useSelector(modeOptionSelector);

    const dispatch = useDispatch();

    const isCityInvalid = (allMatchingCities, city) => {
        return city === '' || allMatchingCities.get(city).length < 2;
    };

    const onForecastOptionClick = useCallback(
        (forecastOption) => (
            dispatch(setForecastOption(forecastOption))
        ),
        [dispatch]
    );

    const onSearchClick = useCallback(
        (city, forecastOption, realtimeTriggerId) => (
            dispatch(searchForecast(city, forecastOption, realtimeTriggerId + 1))
        ),
        [dispatch]
    );

    const onCityChange = useCallback(
        (event) => (
            event.target.value === 'my localization'
                ? navigator.geolocation.getCurrentPosition((pos) => {
                    let lat = pos.coords.latitude;
                    let lon = pos.coords.longitude;
                    return dispatch(searchMatchingCities(lat + ',' + lon));
                }) : dispatch(searchMatchingCities(event.target.value))
        ),
        [dispatch]
    );

    const onCitySelect = useCallback(
        (value) => (
            value === 'my localization'
                ? navigator.geolocation.getCurrentPosition((pos) => {
                    let lat = pos.coords.latitude;
                    let lon = pos.coords.longitude;
                    return dispatch(searchMatchingCities(lat + ',' + lon));
                }) : dispatch(searchMatchingCities(value))
        ),
        [dispatch]
    );

    return (
        <SearchBarWrapper mode={mode}>
            <div>WeatherApp</div>
            <InputCityField
                city={city}
                matchingCities={allMatchingCities.get(city) || []}
                onChange={onCityChange}
                onSelect={onCitySelect}
                mode={mode}
            />
            <SearchAndLoaderField
                active={loading}
                onClick={() => isCityInvalid(allMatchingCities, city) ? {} : onSearchClick(city, forecastOption, realtimeTriggerId)}
            />

            {map((option) => (
                    <ForecastOptionField
                        key={option}
                        forecastOption={option}
                        chosen={forecastOption === option}
                        onClick={() => isCityInvalid(allMatchingCities, city) ? {} : onForecastOptionClick(option)}
                        mode={mode}
                    />
                ), [FORECAST_OPTION.REALTIME, FORECAST_OPTION.HOURLY, FORECAST_OPTION.DAILY]
            )}

        </SearchBarWrapper>
    );
}