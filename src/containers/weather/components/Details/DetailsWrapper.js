import styled from 'styled-components';
import { theme } from 'styled-tools';

export const DetailsWrapper = styled.div`
    font-size: ${theme('fonts.bigFontSize')};
    font-family: ${theme('fonts.basicFontFamily')};
  
    width: 99%;
    float: left;
    text-align: center;
  
    padding-left: 10px;
    border-left: solid 1px;
    border-bottom: solid 1px;
    margin-bottom: 30px;
    padding-bottom: 10px;
`;