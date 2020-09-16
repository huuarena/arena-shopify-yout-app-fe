// @flow

// Data
export type YoutubeVideosData = {};

// App Data State
export type YoutubeVideosState = {
    +youtube_videos: YoutubeVideosData,
};

// App Data Action
export type YoutubeVideosActions = { type: 'CHANGE_YOUTUBE_VIDEOS', +payload: object }; // | Another Action
