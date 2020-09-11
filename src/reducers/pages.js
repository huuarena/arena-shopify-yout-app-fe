// @flow
import type { Action } from '../types';
import type { PagesData } from '../types/pages';

export default (state: PagesData = {}, action: Action): PagesData => {
    switch (action.type) {
        case 'SWITCH_PAGES':
            return {
                ...state,
                selected: action.payload,
            };
        default:
            return state;
    }
};
