// @flow
import type { Action } from '../types';
import type { TemplatesData } from '../types/templates';

export default (state: TemplatesData = [], action: Action): TemplatesData => {
    switch (action.type) {
        case 'CHANGE_TEMPLATES':
            return {
                ...state,
                templates: action.templates,
            };
        default:
            return state;
    }
};
