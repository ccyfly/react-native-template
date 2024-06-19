/* eslint-disable no-console */
import { ApiResponse, ApisauceInstance, create } from 'apisauce'
import { AxiosError, AxiosResponse } from 'axios'

import logger from '../common/logger'
import AbstractClient from './AbstractClient'
import APIResponse from './ApiResponse'
import { API } from './config'

export default class ApiSauceClient extends AbstractClient<ApisauceInstance>{
  constructor(endpoint: string) {
    super(endpoint)
  }

  createInstance(): ApisauceInstance {
    return create({
      baseURL: this.endpoint,
      timeout: API.Timeout,
    })
  }

  public get<T>(path: string, params: Record<string, any>, headerParams: Record<string, string>): Promise<APIResponse<T>> {
    return new Promise<APIResponse<T>>((resolve) => {
      const paramString = this.paramsToQueryString(params)
      const finalPath = path + (paramString.length > 0 ? `?${paramString}` : '')
      logger.request('GET', headerParams, finalPath)
      this.instance.get<T>(finalPath, { headers: headerParams }).then((response: ApiResponse<T>) => {
        logger.resp(response)
        logger.responseBody(response.data as Record<string, unknown>)
        if (response.status && response.status >= 200 && response.status <= 299) {
          const apiResponse = new APIResponse<T>(response.status, response.headers, response.data)
          resolve(apiResponse)
        } else {
          const apiErrorResponse = new APIResponse<T>(response.status ? response.status : -1, response.headers, response.data)
          resolve(apiErrorResponse)
        }
      })
        .catch((error: Error) => {
          const axiosErrorResponse = error.hasOwnProperty('response') ? (error as AxiosError<T>).response : undefined
          if (axiosErrorResponse !== undefined) {
            const errorResponse = new APIResponse<T>(axiosErrorResponse.status, axiosErrorResponse.headers, axiosErrorResponse.data, error)
            resolve(errorResponse)
          } else {
            resolve(new APIResponse<T>(-1, undefined, undefined, error))
          }
        })
    })
  }

  public postJson<T>(path: string, json: Record<string, any>, headerParams: Record<string, string>): Promise<APIResponse<T>> {
    return new Promise<APIResponse<T>>((resolve) => {
      const finalPath = path
      this.instance.post<T>(finalPath, json, { headers: headerParams }).then((response: ApiResponse<T>) => {
        logger.resp(response)
        logger.responseBody(response.data as Record<string, unknown>)
        if (response.status && response.status >= 200 && response.status <= 299) {
          const apiResponse = new APIResponse<T>(response.status, response.headers, response.data)
          resolve(apiResponse)
        } else {
          const apiErrorResponse = new APIResponse<T>(response.status ? response.status : -1, response.headers, response.data)
          resolve(apiErrorResponse)
        }
      })
        .catch((error: AxiosError|Error) => {
          const axiosErrorResponse = error.hasOwnProperty('response') ? (error as AxiosError<T>).response : undefined
          if (axiosErrorResponse !== undefined) {
            const errorResponse = new APIResponse<T>(axiosErrorResponse.status, axiosErrorResponse.headers, axiosErrorResponse.data, error)
            resolve(errorResponse)
          } else {
            resolve(new APIResponse<T>(-1, undefined, undefined, error))
          }
        })
    })
  }
}

