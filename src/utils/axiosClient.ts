import { instance } from "../api/axiosInstance";

export const client = {
  async get<T>(url: string): Promise<T> {
    const response = await instance.get<T>(url);

    return response.data;
  },

  async post<T, D>(url: string, data: D): Promise<T> {
    const response = await instance.post<T>(url, data);

    return response.data;
  },

  async patch<T, D>(url: string, data: D): Promise<T> {
    const response = await instance.patch<T>(url, data);

    return response.data;
  },

  async delete(url: string): Promise<void> {
    await instance.delete(url);
  },
};
