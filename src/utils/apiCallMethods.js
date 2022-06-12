import axios from "axios";

const BASEURL = "http://localhost:2002/api";

export const publicRequest = axios.create({
  baseURL: BASEURL,
});

export const userRequest = (token) => {
  return axios.create({
    baseURL: BASEURL,
    headers: { token: `Bearer ${token}` },
  });
};
