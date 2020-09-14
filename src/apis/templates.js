// @flow
import { callApi } from '../utils/apiCaller';
import { CONFIG } from '../config';

export const getTemplates = async (data: object): object => {
    return await callApi(`http://localhost:3002/admin/templates?store_name=${CONFIG.STORE_NAME}`);
};

export const updateTemplates = async (data_stringfy: string): object => {
    return await callApi(`http://localhost:3002/admin/templates`, 'POST', {
        store_name: CONFIG.STORE_NAME,
        data_stringfy,
    });
};
