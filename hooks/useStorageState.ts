import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native";
import * as opt from "@/types/utils/Option"

type UseStateHook<T> = [[boolean, Option<T>], (value: Option<T>) => void];

function reducer<T>(
  _state: [boolean, Option<T>],
  action: Option<T>
): [boolean, Option<T>] {
  return [false, action]
}

function useAsyncState<T>(
  initialValue: [boolean, Option<T>] = [true, { None: null }]
): UseStateHook<T> {
  return useReducer(
    reducer, initialValue
  ) as UseStateHook<T>
}

export async function SetStorageItemAsync(key: string, value: Option<string>) {
  if (Platform.OS === 'web') {
    try {
      if ('None' in value) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, value.Some)
      }
    } catch (e) {
      console.error("localStorage is unavailable:", e)
    }
  } else {
    if ('None' in value) {
      await SecureStore.deleteItemAsync(key)
    } else {
      await SecureStore.setItemAsync(key, value.Some) 
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>()

  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          const value: Option<string> = {
            Some: localStorage.getItem(key) as string
          }
          setState(value)
        }
      } catch (e) {
        console.error("localStorage is unavailable:", e)
      }
    } else {
      SecureStore.getItemAsync(key)
        .then(res => {
          const value: Option<string> = {
            Some: res as string
          }
          setState(value)
        })
    }
  }, [key])

  const setValue = useCallback(
    (value: Option<string>) => {
      setState(value)
      SetStorageItemAsync(key, value)
    },
    [key]
  )

  return [state, setValue]
}

