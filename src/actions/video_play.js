// @flow

import type { VideoPlayActions } from '../types/video_play';

export const changeVideoPlayAction = (payload: object): VideoPlayActions => {
    return {
        type: 'CHANGE_VIDEO_PLAY',
        payload,
    };
};
