// @flow
import type { Action } from '../types';
import type { YoutAppData } from '../types/yout_app';

export default (state: YoutAppData = {}, action: Action): YoutAppData => {
    switch (action.type) {
        case 'CHANGE_YOUT_APP':
            return { ...state, ...action.payload };
        case 'CHANGE_YOUT_APP_YOUTUBE_API':
            return { ...state, youtube_api: action.payload };
        case 'CHANGE_YOUT_APP_WIDGETS':
            return { ...state, widgets: action.payload };
        default:
            return state;
    }
};
