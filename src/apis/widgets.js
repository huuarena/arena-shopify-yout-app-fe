// @flow
import { callApi } from '../utils/apiCaller';

export const getWidgetById = async (id: string): object => {
    return await callApi(`/admin/widgets?id=${id}`);
};
