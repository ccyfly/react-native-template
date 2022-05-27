import * as logger from '../common/logger'
import Timeout from '../common/Timeout'
import AbstractClient from './AbstractClient'
import APIResponse from './ApiResponse'
import { API } from './config'

export interface IFetchNetClientInstance {
  create: () => void
}

export default class FetchNetClient extends AbstractClient<IFetchNetClientInstance> {
  constructor(endpoint: string) {
    super(endpoint)
  }

  private _request = async (url: string, options: RequestInit): Promise<Response> => {
    return fetch(url, options)
  }

  private _headersToRecord = (headers: Headers) => {
    const result:Record<string, string> = {}
    headers.forEach((k: string, v: string) => {
      Object.assign(result, {
        [k]: v,
      })
    })

    return result
  }

  private _fetchWithTimeout = async (path: string, options: RequestInit, timeout = API.Timeout): Promise<Response> => {
    const timeoutObj = new Timeout<Response>({
      ms: timeout,
    })

    return new Promise((resolve, reject) => {

      Promise
        .race([
          this._request(path, options),
          timeoutObj.start(),
        ])
        .then((success: Response) => {
          timeoutObj.clear()
          // handle response
          // console.log('fetchWithTimeout success: ', success);
          resolve(success)
        }, (error: any) => {
          timeoutObj.clear()
          // handle error
          reject(error)
        })
    })
  }

  createInstance(): IFetchNetClientInstance {
    return {
      create: () => {
        // TODO:
      },
    }
  }

  /**
   * REST - GET
   *
   * @param path  API Path
   * @param params  Query Param
   * @param header API Header
   */
  public get<T>(path: string, params: Record<string, any>, headerParams: Record<string, string>):Promise<APIResponse<T>> {
    return new Promise<APIResponse<T>>((resolve) => {
      let paramString = '?' + this.paramsToQueryString(params)
      if (paramString.startsWith('&')) paramString = paramString.substring(1)
      if (paramString !== '') paramString = '?' + paramString
      const finalPath = path + paramString

      logger.request('GET', headerParams, finalPath)
      void this._fetchWithTimeout(finalPath, {
        method: 'GET',
        headers: headerParams,
      })
        .then(async (response) => {
          logger.resp(response)
          const headers = this._headersToRecord(response.headers)
          const data: T = await response.json() as T

          resolve(new APIResponse(response.status, headers, data))
        })
        .catch((error: Error) => {
          resolve(new APIResponse<T>(-1, undefined, undefined, error))
        })
    })
  }

  /**
   * REST - POST => [JSON Body]
   *
   * @param path  API Path
   * @param params  Body in json format
   * @param header API Header
   */
  public postJson<T>(path: string, json: Record<string, any>, headerParams: Record<string, string>): Promise<APIResponse<T>> {
    return new Promise((resolve) => {
      headerParams['Content-Type'] = 'application/json'
      const jsonString = JSON.stringify(json)

      logger.request('POST', headerParams, path, jsonString)
      void this._fetchWithTimeout(path, {
        method: 'POST',
        headers: headerParams,
        body: jsonString,
      })
        .then(async (response) => {
          logger.resp(response)
          const headers = this._headersToRecord(response.headers)
          const data: T = await response.json() as T
          resolve(new APIResponse<T>(response.status, headers, data))
        })
        .catch((error: Error) => {
          resolve(new APIResponse<T>(-1, undefined, undefined, error))
        })
    })
  }
}
