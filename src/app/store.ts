import { combineReducers, configureStore } from "@reduxjs/toolkit";
import navSlice from "../redux/features/navSlice";
import modalstates from "@/redux/features/modalstates";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";
import userSlice from "@/redux/features/userSlice";

const userPersistConfig = {
    key: 'user', // Specify a unique key for userSlice
    storage: storageSession,
};

const rootReducer = combineReducers({
    nav: navSlice,
    user: persistReducer(userPersistConfig, userSlice), // Persist userSlice
    currentModal: modalstates
});

const persistedReducer = persistReducer(
    { key: 'root', storage }, // Specify the root persist key
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;