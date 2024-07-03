import styled from 'styled-components';
import { theme } from 'styled-tools';

export const PanelWrapper = styled.div`
    color: ${({ mode }) => theme(`colors.${mode}.text`)};
    font-size: ${theme('fonts.basicFontSize')};
    font-family: ${theme('fonts.basicFontFamily')};

    background-color: ${({ mode }) => theme(`colors.${mode}.background`)};

    text-align: left;
    overflow: hidden;
    display: block;
  
    padding: 10px;
`;