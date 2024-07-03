import React from 'react';

import { SwitchWrapper } from "./SwitchWrapper";

export const Switch = ({ mode, onClick }) => (
    <SwitchWrapper mode={mode} onClick={onClick}>
        {mode}
    </SwitchWrapper>
);