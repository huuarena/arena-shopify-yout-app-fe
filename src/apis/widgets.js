// @flow
import { callApi } from '../utils/apiCaller';

export const getWidgets = async () => {
    return await callApi(`http://localhost:3002/admin/widgets`);
};

export const updateWidgets = async (data_stringfy: string) => {
    return await callApi(`http://localhost:3002/admin/widgets`, 'POST', {
        data_stringfy,
    });
};
