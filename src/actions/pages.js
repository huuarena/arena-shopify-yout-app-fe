// @flow

import type { PagesAction } from '../types/pages';

export const switchPagesAction = (payload: number): PagesAction => {
    return {
        type: 'SWITCH_PAGES',
        payload,
    };
};
