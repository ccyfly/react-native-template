import { MMKV } from 'react-native-mmkv'

import { IStorage } from '@/infrastructures/Storage/IStorage'

const storage = new MMKV()

export class MMKVStorage implements IStorage {
  getItem = async (key: string) => {
    const value = storage.getString(key)

    return Promise.resolve(value ?? null)
  }

  setItem = async (key: string, value: string) => {
    return new Promise<boolean>(() => {
      storage.set(key, value)

      return Promise.resolve(true)
    })
  }

  removeItem = async (key: string) => {
    storage.delete(key)

    return Promise.resolve()
  }

  getAllKeys = async () => {
    const value = storage.getAllKeys()

    return Promise.resolve(value)
  }

  clear = async () => {
    storage.clearAll()

    return Promise.resolve()
  }
}

export { storage }
