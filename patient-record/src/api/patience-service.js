import axios from "axios";
import { settings } from "../helpers/settings";
import authHeader from "../helpers/functions/auth-header";

const API_URL = settings.apiURL;


export const getPatients = () => {
    return axios.get(`${API_URL}/patient/all`, {headers: authHeader()});
};

export const addPatient = (patient) => {
  return axios.post(`${API_URL}/patient/admin/add`, patient, {headers: authHeader()});
};
  
