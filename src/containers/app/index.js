import React from 'react';
import { ThemeProvider } from "styled-components";

import { theme } from '../../themes';
import { GlobalStyle } from "../../global-styles";
import { Mode } from '../mode';
import { Search } from '../search';
import { Weather } from '../weather';

export const App = () => (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Search />
        <Weather />
        <Mode />
    </ThemeProvider>
);
