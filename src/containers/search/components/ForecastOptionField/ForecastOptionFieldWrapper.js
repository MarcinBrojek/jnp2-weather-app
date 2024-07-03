import styled from 'styled-components';
import { ifProp, theme } from 'styled-tools';

export const ForecastOptionFieldWrapper = styled.div`
    font-size: ${theme('fonts.smallFontSize')};
    text-decoration: ${ifProp('chosen', 'underline', 'default')};
  
    float: left;
    display: block;
`;