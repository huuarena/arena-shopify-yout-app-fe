// @flow
import { callApi } from '../utils/apiCaller';

export const getWidgets = async (store_name: string): object => {
    return await callApi(`http://localhost:3002/admin/widgets?store_name=${store_name}`);
};

export const updateWidgets = async (store_name: string, data_stringfy: string): object => {
    return await callApi(`http://localhost:3002/admin/widgets?store_name=${store_name}`, 'POST', {
        data_stringfy,
    });
};
