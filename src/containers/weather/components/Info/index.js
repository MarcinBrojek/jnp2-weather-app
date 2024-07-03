import React from 'react';

import { InfoWrapper } from "./InfoWrapper";

export const Info = ({ information }) => {
    return (
        <InfoWrapper>
            Weather is {information}.
        </InfoWrapper>
    );
};