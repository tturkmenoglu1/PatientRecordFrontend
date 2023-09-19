import axios from "axios";
import { settings } from "../helpers/settings";
import authHeader from "../helpers/functions/auth-header";

const API_URL = settings.apiURL;

export const addAppointment = (appointment) => {
    return axios.post(`${API_URL}/appointment/add`, appointment, {headers: authHeader()});
}

export const getAppointmentById = (id) => {
    return axios.get(`${API_URL}/appointment/${id}`, { headers: authHeader() });
}

export const getAppointmentsByPage = (
    page = 0,
    size = 10,
    sort = "id",
    direction = "ASC",
) => {
    return axios.get(
        `${API_URL}/appointment/all/pg?page=${page}&size=${size}&sort=${sort}&direction=${direction}`, { headers: authHeader() });
}