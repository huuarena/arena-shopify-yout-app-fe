// @flow
import { callApi } from '../utils/apiCaller';
import { CONFIG } from '../config';

export const getWidgets = async (data: object): object => {
    return await callApi(`http://localhost:3002/admin/widgets?store_name=${CONFIG.STORE_NAME}`);
};

export const updateWidgets = async (data_stringfy: string): object => {
    return await callApi(`http://localhost:3002/admin/widgets`, 'POST', {
        store_name: CONFIG.STORE_NAME,
        data_stringfy,
    });
};
