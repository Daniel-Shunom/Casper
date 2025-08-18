import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

export function setUserSession(key: string, value: string): void {
  Platform.OS === "web"
  ? localStorage.setItem(key, value)
  : SecureStore.setItemAsync(key, value) 
}

export function getUserSession(key: string): Option<string> {
  if (Platform.OS === "web") {
    const value = localStorage.getItem(key)
    return value !== null
      ? { Some: value }
      : { None: null }
  } else {
    const value = SecureStore.getItem(key)
    return value !== null
      ? { Some: value }
      : { None: null }
  }
} 
