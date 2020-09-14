// @flow

// Data
export type YoutubeApiData = {
    key: string,
};

// App Data State
export type YoutubeApiState = {
    +youtube_api: YoutubeApiData,
};

// App Data Action
export type YoutubeApiAction = { type: 'CHANGE_YOUTUBE_API', +payload: object }; // | Another Action
