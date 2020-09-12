// @flow
import type { TemplatesActions } from '../types/templates';

export const changeTemplatesAction = (payload: object): TemplatesActions => {
    return {
        type: 'CHANGE_TEMPLATES',
        payload,
    };
};
