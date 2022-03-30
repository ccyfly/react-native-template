export default interface IStorage {
  setItem: (key: string, value: string) => Promise<boolean>
  getItem: (key: string) => Promise<string|undefined>
  removeItem: (key: string) => Promise<void>
}
