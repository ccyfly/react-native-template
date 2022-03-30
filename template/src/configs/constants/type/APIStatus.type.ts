// export enum APIStatus {
//   IDLE = 'idle',
//   LOADING = 'loading',
//   SUCCEEDED = 'succeeded',
//   FAILED = 'failed'
// }

export const APIStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
} as const

export type APIStatus = typeof APIStatus[keyof typeof APIStatus]
