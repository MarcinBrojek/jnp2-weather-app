import React from 'react';
import { map } from "ramda";

import { DetailsWrapper } from "./DetailsWrapper";

export const Details = ({ forecastOption, list, icon }) => (
    <DetailsWrapper forecastOption={forecastOption}>
        <img src={icon} alt=""/>
        {map((element) => (
            ' · ' + element
        ), list)}
    </DetailsWrapper>
);