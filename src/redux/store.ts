import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import CompanyReducer from "./slice/CompanySlice";
import PersonalReducer from "./slice/PersonalSlice";
import AdminSlice from "./slice/AdminSlice";
const persistConfig = {
  key: "stdssssssrrssse",
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
