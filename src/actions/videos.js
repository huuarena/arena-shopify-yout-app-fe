// @flow
import type { VideosActions } from '../types/videos';

export const changeVideosAction = (payload: object): VideosActions => {
    return {
        type: 'CHANGE_VIDEOS',
        payload,
    };
};
