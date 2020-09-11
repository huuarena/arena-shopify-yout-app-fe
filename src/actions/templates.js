// @flow
import type { TemplatesActions } from '../types/templates';

export const changeTemplatesActions = (payload: object): TemplatesActions => {
    return {
        type: 'CHANGE_TEMPLATES',
        payload,
    };
};
