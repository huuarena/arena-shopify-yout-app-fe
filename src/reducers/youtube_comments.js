// @flow
import type { Action } from '../types';
import type { YoutubeCommentsData } from '../types/youtube_comments';

export default (state: YoutubeCommentsData = {}, action: Action): YoutubeCommentsData => {
    switch (action.type) {
        case 'CHANGE_YOUTUBE_COMMENTS':
            return action.payload;
        default:
            return state;
    }
};
