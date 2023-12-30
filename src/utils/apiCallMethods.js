import axios from "axios";

const BASEURL = "https://e-commerce-backend-production-033b.up.railway.app/api";

export const publicRequest = axios.create({
  baseURL: BASEURL,
});

export const userRequest = (token) => {
  return axios.create({
    baseURL: BASEURL,
    headers: { token: `Bearer ${token}` },
  });
};
