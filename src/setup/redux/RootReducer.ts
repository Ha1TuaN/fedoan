import {all} from 'redux-saga/effects';
import {combineReducers} from 'redux';

import {modalSlice} from './modal/Slice';
import {globalSlice} from './global/Slice';
import {filterSlice} from './filter/Slice';
//import * as auth from '../../app/modules/auth'

export const rootReducer = combineReducers({
  //auth: auth.reducer,
  modal: modalSlice.reducer,
  global: globalSlice.reducer,
  filter: filterSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([]);
}
