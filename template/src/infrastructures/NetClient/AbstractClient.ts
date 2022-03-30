import { ApisauceInstance } from 'apisauce'
import { AxiosInstance } from 'axios'

import { IFetchNetClientInstance } from './FetchNetClient'
export default class AbstractClient<T extends AxiosInstance|ApisauceInstance|IFetchNetClientInstance> {
  instance: T
  endpoint: string
  constructor(endpoint: string) {
    this.endpoint = endpoint
    this.instance = this.createInstance()
  }

  createInstance():T {
    throw new Error()
  }

  protected paramsToQueryString = (
    params: Record<string, unknown>,
    skipEmpty = false,
    encodeToken = false,
  ) => {
    const paramKeys = Object.keys(params)
    let query = ''
    // const formBody:string[] = [];
    paramKeys.sort()
    paramKeys.forEach((key) => {
      if (
        params[key] !== null &&
        ((skipEmpty && params[key] !== '') || !skipEmpty)
      ) {
        if (query !== '') {
          query += '&'
        }

        if (params[key] instanceof Array) {
          const paramsArray: any[] = params[key] as any[]
          paramsArray.sort()
          paramsArray.forEach((param: any) => {
            query +=
              '&' +
              key +
              '=' +
              (encodeToken
                ? encodeURI(encodeURIComponent(param))
                : encodeURIComponent(param))
            // query += '&' + key + '=' + encodeURI(encodeURIComponent(param));
          })
        } else {
          const value: string = params[key] as string
          query +=
            key +
            '=' +
            (encodeToken
              ? encodeURI(encodeURIComponent(value))
              : encodeURIComponent(value))
          // query += key + '=' + encodeURI(encodeURIComponent(params[key]));
        }
      }
    })
    if (query.startsWith('&')) {
      query = query.substring(1)
    }

    return query
  }
}
