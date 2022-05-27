/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import { ApiResponse } from 'apisauce'
import { AxiosResponse } from 'axios'
import clc from 'cli-color'

import { ITypedMap } from '@/models/index'

import APIResponse from '../NetClient/ApiResponse'

export const info = (message: string): void => {
  console.log(clc.greenBright(message))
}

export const warn = (message: string): void => {
  console.log(clc.yellow(message))
}

export const error = (message: string, errorObj?: Error): void => {
  console.log(clc.red(message))
  if (errorObj) {
    console.log(errorObj)
  }
}

export const request = (method: string, headerParams: Record<string, unknown>, url: string, formBody?: string): void => {

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

export const resp = (response: Response| AxiosResponse| ApiResponse<any>): void => {
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

export const responseBody = (respBody: Record<string, unknown>): void => {
  console.log(`\n
${clc.greenBright('Response [Body]:')}
${clc.greenBright(JSON.stringify(respBody, null, 2))} \n
${clc.blackBright('========================================================================')}
`)
}

export const object = (message: string, obj: Record<string, unknown>|ITypedMap<any>): void => {
  console.log(`\n
  ${clc.blackBright('=============================< ')}${message}${(clc.blackBright('>=================================\n'))}
${clc.greenBright(JSON.stringify(obj, null, 2))} \n
${clc.blackBright('========================================================================')}
`)
}

export const log = (message?: any, ...para:any[]) => {
  console.log(`${clc.greenBright(message)}`, para)
}
