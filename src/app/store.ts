import { configureStore } from "@reduxjs/toolkit";

import navSlice from "../redux/features/navSlice";
import modalstates from "@/redux/features/modalstates";

export const store = configureStore({
    reducer: {
        nav: navSlice,
        currentModal: modalstates
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch