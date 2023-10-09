import axios from "axios";
import { settings } from "../helpers/settings";
import authHeader from "../helpers/functions/auth-header";

const API_URL = settings.apiURL;

export const getStatistics = () => {
    return axios.get(`${API_URL}/database`, { headers: authHeader() });
}