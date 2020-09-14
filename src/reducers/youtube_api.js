// @flow
import type { Action } from '../types';
import type { YoutubeApiData } from '../types/youtube_api';

export default (state: YoutubeApiData = {}, action: Action): YoutubeApiData => {
    switch (action.type) {
        case 'CHANGE_YOUTUBE_API':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
