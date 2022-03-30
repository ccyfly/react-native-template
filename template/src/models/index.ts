import { List, Map } from 'immutable'

export interface ITypedMap<T> extends Map<string, any> {
  get<I extends keyof T>(key: I & string): T[I]
}
