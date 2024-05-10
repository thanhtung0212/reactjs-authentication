import {
  configureStore,
  ThunkAction,
  Action,
  StateFromReducersMapObject
} from "@reduxjs/toolkit";
import appReducer from "./appReducer";
import Storage, { StorageKeys } from "../utils/localStorage";

const reHydrateStore = () => {
  if (localStorage.getItem(StorageKeys.ReduxStore) !== null) {
    return JSON.parse(localStorage.getItem(StorageKeys.ReduxStore)!); // re-hydrate the store
  }
};

const reducer = {
  app: appReducer
};
export type RootState = StateFromReducersMapObject<typeof reducer>;
const store = configureStore({
  reducer,
  preloadedState: reHydrateStore() as RootState
});

store.subscribe(() => {
  Storage.setItem(StorageKeys.ReduxStore, JSON.stringify(store.getState()));
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
