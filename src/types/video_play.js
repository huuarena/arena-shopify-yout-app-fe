// @flow
// Data
export type VideoPlayData = {};

// App Data State
export type VideoPlayState = {
    +video_play: VideoPlayData,
};

// App Data Action
export type VideoPlayAction = { type: 'CHANGE_VIDEO_PLAY', +payload: object }; // | Another Action
