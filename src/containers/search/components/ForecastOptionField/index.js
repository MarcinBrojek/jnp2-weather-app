import React from 'react';

import { ForecastOptionFieldWrapper } from "./ForecastOptionFieldWrapper";

export const ForecastOptionField = ({ forecastOption, chosen, onClick, mode }) => (
    <ForecastOptionFieldWrapper chosen={chosen} onClick={onClick} mode={mode}>
       | {forecastOption} |
    </ForecastOptionFieldWrapper>
);