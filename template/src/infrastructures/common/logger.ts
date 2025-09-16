/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import { REACT_APP_DEBUG } from '@env'
import { ApiResponse } from 'apisauce'
import { AxiosResponse } from 'axios'
import clc from 'cli-color'

import { ITypedMap } from '@/models'

import APIResponse from '../NetClient/ApiResponse'

const log = (message?: any, ...para: any[]) => {
  if (REACT_APP_DEBUG === 'true') {
    if (para === undefined || para === null || para.length === 0) {
      console.log(`${clc.greenBright(message)}`)
    } else if (para && para.length === 1) {
      console.log(`${clc.greenBright(message)}`, para[0])
    } else {
      console.log(`${clc.greenBright(message)}`, para)
    }
  }
}
const debug = (message?: any, ...para: any[]): void => {
  if (REACT_APP_DEBUG === 'true') {
    if (para === undefined || para === null || para.length === 0) {
      console.debug(`${clc.green(message)}`)
    } else if (para && para.length === 1) {
      console.debug(`${clc.green(message)}`, para[0])
    } else {
      console.debug(`${clc.green(message)}`, para)
    }
  }
}
const info = (message: string): void => {
  if (REACT_APP_DEBUG === 'true') console.log(clc.greenBright(message))
}

const warn = (message: string): void => {
  if (REACT_APP_DEBUG === 'true') console.log(clc.yellow(message))
}

const error = (message: string, errorObj?: any): void => {
  if (REACT_APP_DEBUG === 'true') {
    console.log(clc.red(message))
    if (errorObj) {
      console.log(errorObj)
    }
  }
}

const request = (method: string, headerParams: Record<string, unknown>, url: string, formBody?: string): void => {
  if (REACT_APP_DEBUG === 'true') {
    const bodyString = method !== 'GET' ? `${clc.greenBright('\nRequest [Body]')}${!formBody ? clc.greenBright('  <Empty>') : clc.greenBright(`\n${JSON.stringify(JSON.parse(formBody), [''], 2)}`)}` : ''
    const requestSymbol = `${clc.greenBright('Request ==> ')}`

    console.log(`\n
${clc.blackBright('=============================< ')}${requestSymbol}${(clc.blackBright('>=================================\n'))}
${clc.xterm(132)(`Request [Method]: ${method}`)}
${clc.green(`Request [Url]: ${url}`)}
${clc.cyan('Request [Header]')}${!headerParams ? clc.cyan('  <Empty>') : clc.cyan(`\n${JSON.stringify(headerParams, null, 2)}\n`)}${bodyString}
${clc.blackBright('\n========================================================================')}
`)
  }
}

const resp = (response: Response | AxiosResponse | ApiResponse<any>): void => {
  if (REACT_APP_DEBUG === 'true') {
    const responseSymbol = `${clc.greenBright('<== Response ')}`

    const url = response instanceof Response ? response.url : response.config?.url

    console.log(`\n
${clc.blackBright('=============================< ')}${responseSymbol}${(clc.blackBright('>=================================\n'))}
${clc.green(`Response [Url]: ${url}`)}
${clc.yellow(`Response [Status Code]: ${response.status}`)}
${clc.cyan('Response [Header]')}
${clc.cyan(response.headers ? JSON.stringify(response.headers, null, 2) : '')} \n
${clc.blackBright('========================================================================')}
`)
  }
}

const responseBody = (respBody: Record<string, unknown>): void => {
  if (REACT_APP_DEBUG === 'true') {
    console.log(`\n
${clc.greenBright('Response [Body]:')}
${clc.greenBright(JSON.stringify(respBody, null, 2))} \n
${clc.blackBright('========================================================================')}
`)
  }
}

const object = (message: string, obj: Record<string, unknown> | ITypedMap<any>): void => {
  if (REACT_APP_DEBUG === 'true') {
    console.log(`\n
  ${clc.blackBright('=============================< ')}${message}${(clc.blackBright('>=================================\n'))}
${clc.greenBright(JSON.stringify(obj, null, 2))} \n
${clc.blackBright('========================================================================')}
`)
  }
}

export default {
  log,
  info,
  debug,
  warn,
  error,
  request,
  resp,
  responseBody,
  object,
}

