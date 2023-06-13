import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import CompanyReducer from "./slice/CompanySlice";
import PersonalReducer from "./slice/PersonalSlice";
import AdminSlice from "./slice/AdminSlice";
const persistConfig = {
  key: "stosssssre",
  storage,
};

const myReducers = combineReducers({
  CompanyReducer,
  PersonalReducer,
  AdminSlice,
});

const persistedReducer = persistReducer(persistConfig, myReducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch