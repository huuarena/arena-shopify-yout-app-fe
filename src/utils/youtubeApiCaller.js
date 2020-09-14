import axios from 'axios';
import { CONFIG } from '../config';

/**
 * Call API
 * @param {string} enpoint
 * @param {string} method
 * @param {object} data
 */
export const callYoutubeApi = async (endpoint, method = 'GET', data) => {
    console.log('url :>> ', CONFIG.YOUTUBE_API_BASE_URL + endpoint);

    try {
        const res = await axios({
            url: endpoint,
            method,
            data,
            headers: {},
            baseURL: CONFIG.YOUTUBE_API_BASE_URL,
        });

        return {
            success: true,
            payload: res.data,
        };
    } catch (error) {
        let _error = {
            message: error.message,
        };

        if (error?.response) {
            _error = error.response;
        }
        if (error?.response?.data) {
            _error = error.response.data;
        }

        return {
            success: false,
            error: _error,
        };
    }
};
