// @flow
import type { Action } from '../types';
import type { YoutubeVideosData } from '../types/youtube_videos';

export default (state: YoutubeVideosData = {}, action: Action): YoutubeVideosData => {
    switch (action.type) {
        case 'CHANGE_YOUTUBE_VIDEOS':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
