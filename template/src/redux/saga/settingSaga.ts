import {
  call,
  put,
  select,
  StrictEffect,
  take,
  takeLatest,
} from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'

import { Locale } from '@/configs/constants/type'

import { setLocale } from '../reducers/settingSlice'

export function* handleLocaleChange(action: ActionType<typeof setLocale>): Generator<StrictEffect, void, never> {
  const locale = action.payload
}

export function* watchLocaleChange() {
  yield takeLatest(setLocale.type, handleLocaleChange)
}
