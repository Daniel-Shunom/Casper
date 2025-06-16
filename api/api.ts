import type { AxiosRequestConfig } from 'axios'
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios'
import * as AxiosLogger from 'axios-logger'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

const SESSION_TOKEN_KEY = ""

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

function baseURL(): string | undefined {
  return process.env.EXPO_PUBLIC_BASE_URL
} 

const api: AxiosInstance = axios.create({
  baseURL: baseURL(),
  timeout: 30000
})

const getToken = () => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(SESSION_TOKEN_KEY)?.trim()
  }
  return SecureStore.getItem(SESSION_TOKEN_KEY)?.trim()
}

api.interceptors.request.use(
  (config: AdaptAxiosRequestConfig): AdaptAxiosRequestConfig => {
    const token = getToken()

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

if (__DEV__) {
  api.interceptors.request.use(AxiosLogger.requestLogger)
  api.interceptors.response.use(AxiosLogger.responseLogger)
}
