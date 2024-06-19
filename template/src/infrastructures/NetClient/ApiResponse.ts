export default class APIResponse<T = any> {
  origResp: unknown
  ok:boolean
  status: number
  headers?: Record<string, unknown>
  data?: T
  error?: Error
  // problem?: string;
  constructor(status: number, headers?: Record<string, unknown>, data?: T, error?: Error, origResp?: unknown) {
    this.status = status
    this.headers = headers
    this.data = data as T
    this.error = error
    this.ok = status >= 200 && status <= 299
  }
}
