import axios from "axios";
import { enqueueSnackbar } from "notistack";

import type { IJoke } from "../types/joke.type";
import { formatApiError } from "../utils/formatApiError";

export const jokeInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}/jokes`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

jokeInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const formatted = formatApiError(error);

    enqueueSnackbar(formatted.message, { variant: "error" });
    return Promise.reject(error);
  }
);

export const joke_api = {
  async getTen(): Promise<IJoke[]> {
    const { data } = await jokeInstance.get<IJoke[]>("/ten");

    return data;
  },
  async getRandom(): Promise<IJoke> {
    const { data } = await jokeInstance.get<IJoke>("/random");

    return data;
  },
};
