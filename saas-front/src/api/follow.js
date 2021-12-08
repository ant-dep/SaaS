import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("token");

export const getAllFollow = (user_id) => {
  return axios
    .get(config.api_url + "/api/v1/follow/all/" + user_id, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const saveFollow = (data) => {
  return axios
    .post(config.api_url + "/api/v1/follow/add", data, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateFollow = (data, id) => {
  return axios
    .put(config.api_url + "/api/v1/follow/update/" + id, data, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteFollow = (id) => {
  return axios
    .delete(config.api_url + "/api/v1/follow/delete/" + id, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
