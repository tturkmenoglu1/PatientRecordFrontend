import axios from "axios";
import { settings } from "../helpers/settings";
import authHeader from "../helpers/functions/auth-header";

const API_URL = settings.apiURL;

export const getStatistics = (date) => {
    return axios.get(`${API_URL}/database/${date}`,{ headers: authHeader() });
}