// @flow
import axios from 'axios';
import { CONFIG } from '../config';

export const callApi = async (endpoint: string, method?: string = 'GET', data?: object) => {
    console.log('api :>> ', CONFIG.SERVER_HOST + endpoint);

    try {
        const res = await axios({
            url: endpoint,
            method,
            data,
            headers: {},
            baseURL: CONFIG.SERVER_HOST,
        });

        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};
