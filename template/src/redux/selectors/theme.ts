import { createSelector, Selector } from 'reselect'

import { NonPersistState } from '@/redux/reducers/nonPersistSlice'

import { RootState } from '../store'

export const selectState = (state: RootState): NonPersistState => state.nonPersist

export const selectLoading = createSelector<[Selector<RootState, NonPersistState>], boolean>(
  selectState,
  (state: NonPersistState): boolean => {
    const { loadingCount } = state

    return loadingCount > 0
  }
)

export const selectInitiated = createSelector<[Selector<RootState, NonPersistState>], boolean>(
  selectState,
  (state: NonPersistState): boolean => {
    return state.initiated
  }
)
