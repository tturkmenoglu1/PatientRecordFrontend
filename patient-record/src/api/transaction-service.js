import axios from "axios";
import { settings } from "../helpers/settings";
import authHeader from "../helpers/functions/auth-header";

const API_URL = settings.apiURL;

export const addTransaction = (transaction) => {
    return axios.post(`${API_URL}/transaction/add`, transaction, { headers: authHeader() });
}

export const getTransactionById = (transactionId) => {
    return axios.get(`${API_URL}/transaction/${transactionId}`, { headers: authHeader() });
}

export const getAllTransactionByPage = (
    page = 0,
    size = 10,
    sort = "id",
    direction = "DESC",
) => {
    return axios.get(`${API_URL}/transaction/all/page?page=${page}&size=${size}&sort=${sort}&direction=${direction}`, { headers: authHeader() });
}