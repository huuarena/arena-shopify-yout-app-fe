// @flow
import type { YoutubeVideosActions } from '../types/youtube_videos';

export const changeYoutubeVideosAction = (payload: object): YoutubeVideosActions => {
    return {
        type: 'CHANGE_YOUTUBE_VIDEOS',
        payload,
    };
};
