import axios from "axios";

const BASEURL = "https://e-commerce-back-byqu.onrender.com/api";

export const publicRequest = axios.create({
  baseURL: BASEURL,
});

export const userRequest = (token) => {
  return axios.create({
    baseURL: BASEURL,
    headers: { token: `Bearer ${token}` },
  });
};
