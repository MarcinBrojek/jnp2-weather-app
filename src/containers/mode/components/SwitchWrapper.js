import styled from 'styled-components';
import { theme } from 'styled-tools';

import { getOppositeMode } from "../../../weather-logic/logic";

export const SwitchWrapper = styled.button`
    color: ${({ mode }) => theme(`colors.${mode}.text`)};
    border: ${({ mode }) => theme(`colors.${mode}.border`)};
    background-color: ${({ mode }) => theme(`colors.${mode}.background`)};

    height: 60px;
    width: 60px;
    float: right;
    text-align: center;
    position: fixed;
    top: 60px;
    right: 11%;
  
    font-size: ${theme('fonts.smallFontSize')};
    font-family: ${theme('fonts.basicFontFamily')};

    border-radius: 30px;
    border: solid 1px;
  
    &:hover {
        color: ${({ mode }) => theme(`colors.${getOppositeMode(mode)}.text`)};
        border: ${({ mode }) => theme(`colors.${getOppositeMode(mode)}.border`)};
        background-color: ${({ mode }) => theme(`colors.${getOppositeMode(mode)}.background`)};
    }
`;