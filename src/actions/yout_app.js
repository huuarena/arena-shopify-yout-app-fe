// @flow

import type { YoutAppActions } from '../types/yout_app';

export const changeYoutAppAction = (payload: object): YoutAppActions => {
    return {
        type: 'CHANGE_YOUT_APP',
        payload,
    };
};

export const changeYoutAppYoutubeApiAction = (payload: object): YoutAppActions => {
    return {
        type: 'CHANGE_YOUT_APP_YOUTUBE_API',
        payload,
    };
};

export const changeYoutAppWidgetsAction = (payload: Array<object>): YoutAppActions => {
    return {
        type: 'CHANGE_YOUT_APP_WIDGETS',
        payload,
    };
};
