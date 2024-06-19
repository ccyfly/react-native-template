import { MutableRefObject, useEffect } from 'react'
import EncryptedStorage from 'react-native-encrypted-storage'
import useState from 'react-usestateref'

import logger from '@/infrastructures/common/logger'

const useEncryptedStorage = <T = string>(key: string, initialValue: T): [data: T, setNewData: (value: any) => Promise<void>, retrivedFromStorage: boolean, dataRef: MutableRefObject<T>] => {
  const [data, setData, dataRef] = useState(initialValue)
  const [retrievedFromStorage, setRetrievedFromStorage] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        const value = await EncryptedStorage.getItem(key)
        if (typeof value === 'string') {
          setData((JSON.parse(value) as T) || initialValue)
        } else {
          setData(initialValue)
        }
        setRetrievedFromStorage(true)
      } catch (error) {
        // console.error('useAsyncStorage getItem error:', error)
        logger.error('useEncryptedStorage getItem error:', error)
      }
    }
    void init()
  }, [key, initialValue])

  const setNewData = async (value: T) => {
    try {
      await EncryptedStorage.setItem(key, JSON.stringify(value))
      setData(value)
    } catch (error) {
      logger.error('useAsyncStorage setItem error:', error)
    }
  }

  return [data, setNewData, retrievedFromStorage, dataRef]
}

export default useEncryptedStorage
