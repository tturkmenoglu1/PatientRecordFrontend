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
  
export const getPatientsByPage = ({
  q="",
  name="",
  lastName="",
  phoneNumber = "",
  page = 0,
  size = 12,
  sort = "id",
  direction = "ASC",
}) => {
  const qQ = q.length ? `&q=${q.join(",")}` : "";
  const nameQ = name.length ? `&name=${name.join(",")}` : "";
  const lastNameQ = lastName.length ? `&lastName=${lastName.join(",")}` : "";
  const phoneNumberQ = phoneNumber.length ? `&phoneNumber=${phoneNumber.join(",")}` : "";

  return axios.get(
    `${API_URL}/patient/all/page?${qQ}${nameQ}${lastNameQ}${phoneNumberQ}&page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    {
      headers: authHeader(),
    }
  )
}