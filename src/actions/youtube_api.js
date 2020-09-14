// @flow
import type { YoutubeApiActions } from '../types/youtube_api';

export const changeYoutubeApiAction = (payload: object): YoutubeApiActions => {
    return {
        type: 'CHANGE_YOUTUBE_API',
        payload,
    };
};
