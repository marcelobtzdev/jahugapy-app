import axios from 'axios';
import config from '.';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

let store: ToolkitStore;

export const injectStore = (_store: ToolkitStore) => {
  store = _store
}

const axiosInstance =  axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  if (state.user.accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${state.user.accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, error => {
  if (401 === error.response.status) {
    store.dispatch({type: 'user/clearUser'});
  } else {
    return Promise.reject(error);
  }
});

export default axiosInstance;