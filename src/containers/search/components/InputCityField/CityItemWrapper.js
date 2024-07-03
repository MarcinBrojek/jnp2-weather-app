import styled from 'styled-components';
import { ifProp, theme } from "styled-tools";
import {getOppositeMode} from "../../../../weather-logic/logic";


export const CityItemWrapper = styled.div`
  color: ${({ mode }) => ifProp('isHighlighted', theme(`colors.${getOppositeMode(mode)}.text`), theme(`colors.${mode}.text`))};
  background-color: ${({ mode }) => ifProp('isHighlighted', theme(`colors.${getOppositeMode(mode)}.background`), theme(`colors.${mode}.background`))};
`;