"use client";

import { get, set } from "idb-keyval";

export async function getOfflineValue<T>(key: string, fallback: T): Promise<T> {
  try {
    const value = await get<T>(key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export async function setOfflineValue<T>(key: string, value: T) {
  try {
    await set(key, value);
  } catch (error) {
    console.error(`Unable to cache offline value for key "${key}"`, error);
  }
}
