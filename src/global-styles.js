import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body {
        min-width: 1600px;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    
    #root {
        margin: 40px 10%;
        width: 80%;
        height: 80%;
        display: block;
    }
`;