import styled from 'styled-components';
import { theme } from 'styled-tools';

export const SquareCellWrapper = styled.div`
    color: ${({ mode }) => theme(`colors.${mode}.text`)};
    font-size: ${theme('fonts.basicFontSize')};
    font-family: ${theme('fonts.basicFontFamily')};
  
    float: left;
    text-align: left;
    width: 69%;
    display: block;
`;