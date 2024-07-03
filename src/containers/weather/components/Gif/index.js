import React from 'react';

import { GifWrapper } from "./GifWrapper";

export const Gif = ({ gif }) => (
    <GifWrapper gif={gif}>
        <img src={gif} alt="" />
    </GifWrapper>
);