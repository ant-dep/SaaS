import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("token");

export const saveProspect = (data) => {
  return axios
    .post(config.api_url + "/api/v1/prospect/add", data, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllProspect = (user_id) => {
  return axios
    .get(config.api_url + "/api/v1/prospect/all/" + user_id, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteProspect = (id) => {
  return axios
    .delete(config.api_url + "/api/v1/prospect/delete/" + id, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateProspect = (data, id) => {
  return axios
    .put(config.api_url + "/api/v1/prospect/update/" + id, data, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
