import axios from "axios";
import { settings } from "../helpers/settings";
import authHeader from "../helpers/functions/auth-header";

const API_URL = settings.apiURL;


export const getPatients = () => {
    return axios.get(`${API_URL}/patient/all`, {headers: authHeader()});
};

export const getPatientById = (id) => {
  return axios.get(`${API_URL}/patient/${id}`, {headers: authHeader()});
};

export const deletePatientById = (id) => {
  return axios.delete(`${API_URL}/patient/admin/${id}/auth`, {headers: authHeader()});
};

export const addPatient = (patient) => {
  return axios.post(`${API_URL}/patient/admin/add`, patient, {headers: authHeader()});
};
  
export const getPatientsByPage = ({
  q="",
  firstName="",
  lastName="",
  phoneNumber = "",
  page = 0,
  size = 10,
  sort = "id",
  direction = "ASC",
}) => {
  return axios.get(
    `${API_URL}/patient/all/page?q=${q}&firstName=${firstName}&lastName=${lastName}&phoneNumber=${phoneNumber}&page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    {
      headers: authHeader(),
    }
  )
}