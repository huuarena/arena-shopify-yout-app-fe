// @flow

// Data
export type YoutubeCommentsData = {};

// App Data State
export type YoutubeCommentsState = {
    +youtube_comments: YoutubeCommentsData,
};

// App Data Action
export type YoutubeCommentsAction = { type: 'CHANGE_YOUTUBE_COMMENTS', +payload: object }; // | Another Action
