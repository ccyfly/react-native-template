declare module 'StoreTypes' {
  export type RootAction = ActionType<typeof import('../actions').default>;
  export type RootState = StateType<typeof import('../reducers').default>;
  export type Store = StateType<typeof import('./index').default>;
}