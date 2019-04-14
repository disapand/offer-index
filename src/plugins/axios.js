'use strict'

import axios from 'axios'
import store from '../store'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  baseURL: 'http://offer.test/api'
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    config.headers.common['Authorization'] = store.getters.getToken
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response.headers.authorization) {
      store.commit('setToken', response.headers.authorization)
    }
    if (response.data.token) {
      store.commit('setToken', response.data.token)
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default _axios
