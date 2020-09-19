// @flow

import type { WidgetSelectedActions } from '../types/widget_selected';

export const changeWidgetSelectedAction = (payload: object): WidgetSelectedActions => {
    return {
        type: 'CHANGE_WIDGET_SELECTED',
        payload,
    };
};
