import React from 'react';

import { CityItemWrapper } from "./CityItemWrapper";
import Autocomplete from "react-autocomplete";
import { InputCityFieldWrapper } from "./InputCityFieldWrapper";

export const InputCityField = ({ city, matchingCities, onChange, onSelect, mode }) => (
    <InputCityFieldWrapper mode={mode}>
        Search:
        <Autocomplete
            getItemValue={(item) => item}
            items={Array.from(matchingCities)}
            renderItem={(item, isHighlighted) => (
                <CityItemWrapper key={item} isHighlighted={isHighlighted} mode={mode}>
                    {item}
                </CityItemWrapper>
            )}
            value={city}
            onChange={onChange}
            onSelect={onSelect}
        />
    </InputCityFieldWrapper>
);
