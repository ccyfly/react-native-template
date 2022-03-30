import APIResponse from '../ApiResponse'

export interface INetClient {
  get<T>(path: string, params: Record<string, any>, headerParams: Record<string, string>): Promise<APIResponse<T>>
  postJson<T>(path: string, json: Record<string, any>, headerParams: Record<string, string>): Promise<APIResponse<T>>
}
