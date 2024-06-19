import { MutableRefObject, useCallback, useState } from 'react'

import { StorageKey } from '@/configs/constants/type'
import useEncryptedStorage from '@/hooks/useEncryptedStorage'

const useDeviceToken = ():[string, (value: string) => void, boolean, MutableRefObject<string>] => {
  const [
    deviceToken,
    setDeviceToken,
    retrievedDeviceTokenFromStorage,
    tokenRef,
  ] = useEncryptedStorage(StorageKey.deviceToken, '')
  const setNewDeviceToken = useCallback((newDeviceToken: string) => {
    void setDeviceToken(newDeviceToken)
  }, [setDeviceToken])

  return [deviceToken, setNewDeviceToken, retrievedDeviceTokenFromStorage, tokenRef]
}

export default useDeviceToken
