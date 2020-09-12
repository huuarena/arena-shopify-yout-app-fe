// @flow
import type { WidgetsActions } from '../types/widgets';

export const changeWidgetsAction = (payload: object): WidgetsActions => {
    return {
        type: 'CHANGE_WIDGETS',
        payload,
    };
};
