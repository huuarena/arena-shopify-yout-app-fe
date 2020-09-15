// @flow

// Data
export type VideosData = {};

// App Data State
export type VideosState = {
    +videos: VideosData,
};

// App Data Action
export type VideosActions = { type: 'CHANGE_VIDEOS', +payload: object }; // | Another Action
