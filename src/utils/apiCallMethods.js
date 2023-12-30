import axios from "axios";

const BASEURL = "https://e-commerce-backend-production-38d6.up.railway.app/api";

export const publicRequest = axios.create({
  baseURL: BASEURL,
});

export const userRequest = (token) => {
  return axios.create({
    baseURL: BASEURL,
    headers: { token: `Bearer ${token}` },
  });
};
