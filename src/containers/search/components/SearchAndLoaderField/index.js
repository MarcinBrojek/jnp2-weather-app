import React from 'react';

import Loader from "react-loader-spinner";
import { SquareCellWrapper } from "./SquareCellWrapper";

export const SearchAndLoaderField = ({active, onClick}) => (
    <SquareCellWrapper onClick={onClick}>
        {active ? '' : 'GO!'}
        <Loader
            height={20}
            type='Oval'
            color='gray'
            visible={active}
        />
    </SquareCellWrapper>
);