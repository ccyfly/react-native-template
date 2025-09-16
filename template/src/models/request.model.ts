import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export interface IBaseResponse<T> {
  timestamp: number
  success: boolean
  code: number
  message: string
  result: T
}

export interface IBaseRequestWithSign extends IBaseRequest {
  noncr: number
  timestamp: number
  sign: string
}

export interface IBaseRequest {
  language?: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _ts?: number // use to refresh cache
}

export type IRequest<T> = T & IBaseRequest

type IPageable = {
  pageIndex?: number
  pageSize?: number
}
export type IPageableRequest<T> = IRequest<T> & IPageable

export type IResponseError = {
  status: number
  message: string
  data: {
    code: number
    message: string
    success: boolean
  }
  exception?: string
}

export type IUseFetchData<T> = {
  isFetching: boolean
  isLoading: boolean
  isSuccess: boolean
  refetch: () => any
  data?: T
  error: FetchBaseQueryError | SerializedError | undefined
}
