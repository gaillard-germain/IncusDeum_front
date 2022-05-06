import Axios from 'axios';

export const API = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    // 'Accept': 'application/json, text/html, application/x-www-form-urlencoded, multipart/form-data',
    // 'Content-Type': 'text/html, application/json, application/x-www-form-urlencoded, multipart/form-data',
    // 'Access-Control-Allow-Credentials': true,
  }
})
