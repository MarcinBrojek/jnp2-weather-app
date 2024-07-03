import { combineEpics } from "redux-observable";

import { searchEpics } from "./containers/search/epics";
import { weatherEpics } from "./containers/weather/epics";

export const rootEpic = combineEpics(searchEpics, weatherEpics);