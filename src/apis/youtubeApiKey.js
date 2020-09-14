// @flow
import { callApi } from '../utils/apiCaller';
import { CONFIG } from '../config';

export const getYoutubeApiKey = async (data: object): object => {
    return await callApi(
        `http://localhost:3002/admin/youtube-api-key?store_name=${CONFIG.STORE_NAME}`,
    );
};

export const updateYoutubeApiKey = async (data_stringfy: string): object => {
    return await callApi(`http://localhost:3002/admin/youtube-api-key`, 'POST', {
        store_name: CONFIG.STORE_NAME,
        data_stringfy,
    });
};
