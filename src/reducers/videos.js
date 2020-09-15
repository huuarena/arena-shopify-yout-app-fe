// @flow
import type { Action } from '../types';
import type { VideosData } from '../types/videos';

export default (state: VideosData = {}, action: Action): VideosData => {
    switch (action.type) {
        case 'CHANGE_VIDEOS':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
