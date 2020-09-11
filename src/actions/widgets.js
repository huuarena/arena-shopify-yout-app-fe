// @flow
import type { WidgetsActions } from '../types/widgets';

export const changeWidgetsAction = (payload: object): WidgetsActions => {
    return {
        type: 'CHANGE_WIDGETS',
        payload,
    };
};

export const editWidgetAction = (payload: object): WidgetsActions => {
    return {
        type: 'EDIT_WIDGET',
        payload,
    };
};
