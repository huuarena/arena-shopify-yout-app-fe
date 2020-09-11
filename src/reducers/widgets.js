// @flow
import type { Action } from '../types';
import type { WidgetsData } from '../types/widget';

export default (state: WidgetsData = [], action: Action): WidgetsData => {
    switch (action.type) {
        case 'CHANGE_WIDGETS':
            return {
                ...state,
                ...action.payload,
            };
        case 'EDIT_WIDGET':
            return {
                ...state,
                selected: action.payload,
            };
        default:
            return state;
    }
};
