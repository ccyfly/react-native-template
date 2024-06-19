import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_ENDPOINT, API_TIMEOUT } from '@/configs'
import logger from '@/infrastructures/common/logger'
import { IBaseResponse } from '@/models/request.model'

export const baseQuery = fetchBaseQuery({
  baseUrl: API_ENDPOINT,
  timeout: API_TIMEOUT,
})
export const baseQueryWithErrorHandle: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  logger.log('baseQueryWithErrorHandle args', args)
  const result = await baseQuery(args, api, extraOptions)
  if (result.data) {
    const data = result.data as IBaseResponse<unknown>
    logger.log('baseQueryWithErrorHandle data', data)

    if (!data.success) {
      return {
        error: {
          status: result?.meta?.response?.status || 0,
          data: {
            success: false,
            code: data.code,
            message: data.message,
          },
          message: data.message,
        },
      }
    }

    return result
  }

  return result
}
