import styled from "styled-components";
import { theme } from "styled-tools";

export const InfoWrapper = styled.div`
    font-size: ${theme('fonts.largeFontSize')};
    font-family: ${theme('fonts.niceFontFamily')};
  
    width: 99%;
    float: left;
  
    padding-left: 10px;
    border-left: solid 1px;
    border-bottom: solid 1px;
    margin-bottom: 30px;
`;