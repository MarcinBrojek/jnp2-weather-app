import { prop } from 'ramda';
import { createSelector } from 'reselect';

import { MODE_REDUCER_NAME } from "./reducer";

const getModeReducerState = prop(MODE_REDUCER_NAME);

export const modeOptionSelector = createSelector(
    getModeReducerState,
    (mode) => mode.get('option')
);
