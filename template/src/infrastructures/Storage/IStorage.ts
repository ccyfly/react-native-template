export interface IStorage {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<boolean>
  removeItem: (key: string) => Promise<void>
  getAllKeys: () => Promise<string[]>
  clear: () => Promise<void>
}
