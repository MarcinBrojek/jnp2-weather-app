import styled from 'styled-components';
import { theme } from 'styled-tools';

export const SearchBarWrapper = styled.div`
    color: ${({ mode }) => theme(`colors.${mode}.text`)};
    font-size: ${theme('fonts.largeFontSize')};
    font-family: ${theme('fonts.basicFontFamily')};
  
    background-color: ${({ mode }) => theme(`colors.${mode}.background`)};
    
    text-align: left;
    overflow: hidden;
    display: block;
    padding: 10px 10px 30px 10px;
    border-bottom: dashed 1px;
`;