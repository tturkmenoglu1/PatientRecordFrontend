import axios from "axios";
import { settings } from "../helpers/settings";
import authHeader from "../helpers/functions/auth-header";

const API_URL = settings.apiURL;

export const addAppointment = (appointment) => {
    return axios.post(`${API_URL}/appointment/add`, appointment, {headers: authHeader()});
}