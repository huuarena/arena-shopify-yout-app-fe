// @flow

// Data
export type YoutubeChannelData = {};

// App Data State
export type YoutubeChannelState = {
    +youtube_channel: YoutubeChannelData,
};

// App Data Action
export type YoutubeChannelActions = { type: 'CHANGE_YOUTUBE_CHANNEL', +payload: object }; // | Another Action
