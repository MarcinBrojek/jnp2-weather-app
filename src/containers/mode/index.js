import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Switch } from "./components";
import { modeOptionSelector } from "./selectors";
import { setOppositeMode } from "./actions";

export const Mode = () => {
    const mode = useSelector(modeOptionSelector);
    const dispatch = useDispatch();
    const onClick = () => dispatch(setOppositeMode());

    return (
        <Switch
            mode={mode}
            onClick={onClick}
        />
    );
}