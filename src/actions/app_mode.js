// @flow
import type { AppModeActions } from '../types/app_mode';

export const changeAppModeAction = (payload: object): AppModeActions => {
    return {
        type: 'CHANGE_APP_MODE',
        payload,
    };
};
