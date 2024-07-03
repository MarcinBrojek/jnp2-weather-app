import { fromJS } from 'immutable';

import { DEFAULT_MODE } from "../../weather-logic/const";
import { SET_OPPOSITE_MODE } from "./const";
import { getOppositeMode } from "../../weather-logic/logic";

export const MODE_REDUCER_NAME = 'Mode';

const initialState = fromJS({
    option: DEFAULT_MODE
});

export const modeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OPPOSITE_MODE:
            return state.update('option', (option) => getOppositeMode(option))
        default:
            return state;
    }
};