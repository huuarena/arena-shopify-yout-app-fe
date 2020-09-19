// @flow
import type { Action } from '../types';
import type { WidgetSelectedData } from '../types/widget_selected';

export default (state: WidgetSelectedData = {}, action: Action): WidgetSelectedData => {
    switch (action.type) {
        case 'CHANGE_WIDGET_SELECTED':
            return action.payload;
        default:
            return state;
    }
};
