import axios from 'axios';

const baseURL = 'http://172.20.10.2:8000';

const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
