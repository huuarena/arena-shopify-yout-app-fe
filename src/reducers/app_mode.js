// @flow
import type { Action } from '../types';
import type { AppModeData } from '../types/app_mode';

export default (state: AppModeData = {}, action: Action): AppModeData => {
    switch (action.type) {
        case 'CHANGE_APP_MODE':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
