// @flow
import type { YoutubeChannelActions } from '../types/youtube_channel';

export const changeYoutubeChannelAction = (payload: object): YoutubeChannelActions => {
    return {
        type: 'CHANGE_YOUTUBE_CHANNEL',
        payload,
    };
};
