import type { AxiosRequestConfig } from "axios";
import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import * as AxiosLogger from "axios-logger";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import * as Schema from "./types/types";

const SESSION_TOKEN_KEY = "";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

function baseURL(): string | undefined {
  return process.env.EXPO_PUBLIC_BASE_URL;
}

const api: AxiosInstance = axios.create({
  baseURL: baseURL(),
  timeout: 30000,
});

const getToken = () => {
  if (Platform.OS === "web") {
    return localStorage.getItem(SESSION_TOKEN_KEY)?.trim();
  }
  return SecureStore.getItem(SESSION_TOKEN_KEY)?.trim();
};

api.interceptors.request.use(
  (config: AdaptAxiosRequestConfig): AdaptAxiosRequestConfig => {
    const token = getToken();

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

if (__DEV__) {
  api.interceptors.request.use(AxiosLogger.requestLogger);
  api.interceptors.response.use(AxiosLogger.responseLogger);
}

export const createNewUser = async (user: Schema.NewUser) =>
  await api.post<Schema.NewUser>("/user/signup", user);

export const createFetchProfile = async (credential: Schema.UserSession) =>
  await api.post<Schema.UserProfile>("/user/profile", credential);

export const createSignin = async (credentials: Schema.UserSignin) => {
  await api.post<Schema.UserAuth>("/auth/signin", credentials);
};

export const createSignout = async (credential: Schema.UserSession) =>
  await api.post("/auth/signout", credential);

export const createRoom = async (room: Schema.NewRoom) =>
  await api.post<Schema.NewRoomResponse>("/rooms/newroom", room);

export const deleteRoom = async (deleteroom: Schema.DeleteRoom) =>
  await api.delete("/rooms/delete", { data: deleteroom });

export const joinRoom = (
  roomid: string,
  userid: string,
  onmessage: (data: unknown) => void
): WebSocket => {
  const http_url = process.env.EXPO_BASE_URL!.replace(/\/$/, "");
  const ws_url =
    http_url.replace(/^http/, "ws") + `rooms/joinroom/${roomid}/${userid}`;

  const socket = new WebSocket(ws_url);

  socket.onopen = () => console.log("joined room");
  socket.onerror = (error) => console.error(error);
  socket.onclose = (evt) => console.log("left room", [evt.code, evt.reason]);
  socket.onmessage = (message) => {
    try {
      onmessage(JSON.parse(message.data));
    } catch (error) {
      console.log(error);
    }
  };

  return socket;
};

export const getApi = () => api;
