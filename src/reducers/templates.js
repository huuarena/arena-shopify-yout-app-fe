// @flow
import type { Action } from '../types';
import type { TemplatesData } from '../types/templates';

export default (state: TemplatesData = [], action: Action): TemplatesData => {
    switch (action.type) {
        case 'CHANGE_TEMPLATES':
            return action.payload;
        default:
            return state;
    }
};
