// @flow
import { callApi } from '../utils/apiCaller';

export const getYoutubeApi = async (store_name: string): object => {
    return await callApi(`http://localhost:3002/admin/youtube-api?store_name=${store_name}`);
};

export const updateYoutubeApi = async (store_name: string, data_stringfy: string): object => {
    return await callApi(
        `http://localhost:3002/admin/youtube-api?store_name=${store_name}`,
        'POST',
        {
            data_stringfy,
        },
    );
};
