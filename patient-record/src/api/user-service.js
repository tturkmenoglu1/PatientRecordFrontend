import axios from "axios";

import { settings } from "../helpers/settings";

const API_URL = settings.apiURL;

// USER ENDPOINTS
// Register
export const register = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

// Login
export const login = (credential) => {
  return axios.post(`${API_URL}/login`, credential);
};

export const getUser = () => {
    return axios.get(`${API_URL}/users/auth`);
  };
  