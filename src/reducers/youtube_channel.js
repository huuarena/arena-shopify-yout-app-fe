// @flow
import type { Action } from '../types';
import type { YoutubeChannelData } from '../types/youtube_channel';

export default (state: YoutubeChannelData = {}, action: Action): YoutubeChannelData => {
    switch (action.type) {
        case 'CHANGE_YOUTUBE_CHANNEL':
            return action.payload;
        default:
            return state;
    }
};
