import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("token");

export const getAllRdv = (user_id) => {
  return axios
    .get(config.api_url + "/api/v1/rdv/all/" + user_id, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      console.log("allrdv", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveRdv = (data) => {
  return axios
    .post(config.api_url + "/api/v1/rdv/add", data, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteRdv = (_id) => {
  return axios
    .delete(config.api_url + "/api/v1/rdv/delete/" + _id, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateRdv = (data, _id) => {
  return axios
    .put(config.api_url + "/api/v1/rdv/update/" + _id, data, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
