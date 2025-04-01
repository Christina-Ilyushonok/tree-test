import axios from "axios";
import { BASE_URL } from "../config/configAPI";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendPostRequestWithParamsInUrl = async (url: string, params: Record<string, string>) => {
  try {
    const urlWithParams = `${url}?${new URLSearchParams(params).toString()}`;
    const response = await api.post(urlWithParams);
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Error during POST request to ${url}: ${(error as Error).message}`);
  }
};

export const sendGetRequest = async (url: string, params?: object) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Error during GET request to ${url}: ${(error as Error).message}`);
  }
};

export const sendDeleteRequest = async (url: string, params?: object) => {
  try {
    const response = await api.post(url, { params });
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Error during DELETE request to ${url}: ${(error as Error).message}`);
  }
};