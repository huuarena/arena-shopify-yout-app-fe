// @flow
import axios from 'axios';

export const callApi = async (endpoint: string, method: string = 'GET', data: object) => {
    try {
        const res = await axios({
            url: endpoint,
            method,
            data,
            headers: {},
        });

        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};
