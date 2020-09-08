// @flow
import type { WidgetsActions } from '../types/widgets';

export const changeWidgetsAction = (widgets: object): WidgetsActions => {
    return {
        type: 'CHANGE_WIDGETS',
        widgets,
    };
};

export const editWidgetAction = (widget: object): WidgetsActions => {
    return {
        type: 'EDIT_WIDGET',
        widget,
    };
};
