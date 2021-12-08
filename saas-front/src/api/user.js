import axios from "axios";
import { config } from "../config";

export const saveUser = (data) => {
  return axios
    .post(`${config.api_url}/api/v1/user/add`, data)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const loginUser = (data) => {
  return axios
    .post(`${config.api_url}/api/v1/user/login`, data)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const forgotPassword = (data) => {
  return axios
    .post(`${config.api_url}/api/v1/user/forgot`, data)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
