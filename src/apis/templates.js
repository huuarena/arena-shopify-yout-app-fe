// @flow
import { callApi } from '../utils/apiCaller';

export const getTemplates = async (): object => {
    return await callApi(`http://localhost:3002/admin/templates`);
};

export const updateTemplates = async (data_stringfy: string): object => {
    return await callApi(`http://localhost:3002/admin/templates`, 'POST', {
        data_stringfy,
    });
};
