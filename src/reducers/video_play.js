// @flow
import type { Action } from '../types';
import type { VideoPlayData } from '../types/video_play';

export default (state: VideoPlayData = {}, action: Action): VideoPlayData => {
    switch (action.type) {
        case 'CHANGE_VIDEO_PLAY':
            return action.payload;
        default:
            return state;
    }
};
