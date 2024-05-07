import { TechnicalSeoType } from "@/types/TechnicalSeoType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PersistPartial } from "redux-persist/es/persistReducer";

interface SeoData {
    metrics: TechnicalSeoType | null,
    loading: boolean;
    error: string | null;
    _persist?: PersistPartial; // Add this if you're using redux-persist
}


const initialState: SeoData = {
   metrics: null,
   loading: false,
   error: null,
}

const technicalSeoData = createSlice({
    name: 'technicalSeo',
    initialState,
    reducers: {
        fetchTechnicalSEOStart(state) {
            state.loading = true;
            state.error = null;
          },
        setTechnicalSeo: (state, action: PayloadAction<TechnicalSeoType>) => {
            state.metrics = action.payload;
        },
        fetchTechnicalSEOFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
          },

    }
})

export const { setTechnicalSeo, fetchTechnicalSEOFailure, fetchTechnicalSEOStart} = technicalSeoData.actions;

export default technicalSeoData.reducer;
