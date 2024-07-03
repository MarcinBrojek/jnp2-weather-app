import styled from 'styled-components';
import { theme } from 'styled-tools';

export let InputCityFieldWrapper = styled.div`
    color: ${({ mode }) => theme(`colors.${mode}.text`)};
    font-size: ${theme('fonts.basicFontSize')};
    font-family: ${theme('fonts.basicFontFamily')};
  
    width: 30%;
    float: left;
    display: block;

    background-color: ${({ mode }) => theme(`colors.${mode}.background`)};
`;