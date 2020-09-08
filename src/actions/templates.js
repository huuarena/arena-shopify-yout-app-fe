// @flow
import type { TemplatesActions } from '../types/templates';

export const changeTemplatesActions = (templates: object): TemplatesActions => {
    return {
        type: 'CHANGE_TEMPLATES',
        templates,
    };
};
