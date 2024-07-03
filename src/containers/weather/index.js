import React from 'react';
import { useSelector } from "react-redux";
import { map } from "ramda";

import { PanelWrapper, Details, Gif, Info } from "./components";
import { weatherGifNumberSelector, weatherGifsSelector, weatherDataSelector } from "./selectors";
import { searchForecastOptionSelector } from "../search/selectors";
import { safeGet, scoreTheWeather } from "../../weather-logic/logic";
import { FORECAST_OPTION } from "../../weather-logic/const";
import { modeOptionSelector } from "../mode/selectors";

export const Weather = () => {
    const data = useSelector(weatherDataSelector);
    const forecastOption = useSelector(searchForecastOptionSelector).toString();
    const gifs = useSelector(weatherGifsSelector);
    const gifNumber = useSelector(weatherGifNumberSelector);
    const mode = useSelector(modeOptionSelector);

    let information = scoreTheWeather(forecastOption, data).toString();

    const timeTopic = {
        [FORECAST_OPTION.REALTIME]: 'last_updated',
        [FORECAST_OPTION.HOURLY]: 'time',
        [FORECAST_OPTION.DAILY]: 'date'
    };

    const weatherFieldsNames = {
        [FORECAST_OPTION.REALTIME]: [
            ['🌡', 'temp_c', '°C'],
            ['🚩', 'wind_kph', 'kph'],
            ['🧭', 'wind_dir', ''],
            ['🌫', 'cloud', '%'],
            ['💧', 'humidity', '%']
        ],
        [FORECAST_OPTION.HOURLY]: [
            ['🌡', 'temp_c', '°C'],
            ['🚩', 'wind_kph', 'kph'],
            ['🧭', 'wind_dir', ''],
            ['🌫', 'cloud', '%'],
            ['💧', 'humidity', '%']
        ],
        [FORECAST_OPTION.DAILY]: [
            ['🌡', 'avgtemp_c', '°C'],
            ['▲🌡', 'maxtemp_c', '°C'],
            ['▼🌡', 'mintemp_c', '°C'],
            ['▲🚩', 'maxwind_kph', 'kph'],
            ['💧', 'avghumidity', '%']
        ]
    }

    return (
        <PanelWrapper mode={mode}>
            <br/>
            <div>WeatherText</div>
            <Info
                information={information}
            />
            <div>WeatherGif Via Tenor</div>
            <Gif
                gif={gifs[gifNumber]}
            />
            {
                map((element) => (
                    <div key={element[timeTopic[forecastOption]]}>{element[timeTopic[forecastOption]]}
                        <Details
                            forecastOption={forecastOption}
                            list={
                                map((weatherField) => weatherField[0] + ' ' + element[weatherField[1]] + weatherField[2],
                                    weatherFieldsNames[forecastOption])
                            }
                            icon={safeGet(element, ['condition', 'icon'], '')}
                        />
                    </div>
                ), data)
            }
        </PanelWrapper>
    );
}