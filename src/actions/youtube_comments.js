// @flow
import type { YoutubeCommentsActions } from '../types/youtube_comments';

export const changeYoutubeCommentsAction = (payload: object): YoutubeCommentsActions => {
    return {
        type: 'CHANGE_YOUTUBE_COMMENTS',
        payload,
    };
};
