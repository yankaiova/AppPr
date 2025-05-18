import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
import { appApi } from "./api";

import globalReducer from "./slice";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  global: globalReducer,
  [appApi.reducerPath]: appApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});
setupListeners(store.dispatch);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
