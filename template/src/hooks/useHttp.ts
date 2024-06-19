import { useCallback, useState } from 'react'

import AxiosClient from '@/infrastructures/NetClient/AxiosClient'
import { INetClient } from '@/infrastructures/NetClient/interfaces/INetClient'

const makeHttpClinet = (netClientType: string, endpoint: string) => {
  const netClient = new AxiosClient(endpoint)

  return (path: string) => {


    return [{}]
  }

}
export const useHttp = () => {

}
