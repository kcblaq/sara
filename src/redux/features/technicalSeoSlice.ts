import { TechnicalSeoType } from "@/types/TechnicalSeoType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TechnicalSeoType = {
    data: [],
    lcp: {
        poor: 0,
        needsImprovement: 0,
        good: 0
    },
    tbt: {
        poor: 0,
        needsImprovement: 0,
        good: 0
    },
    cls: {
        poor: 0,
        needsImprovement: 0,
        good: 0
    },
    crawled: {
        total: "",
        crawled: 0,
        uncrawled: 0
    },
    httpStatusCode:  {},
    siteIssue: {
        error: 0,
        warning: 0,
        notices: 0,
        issues: []
    }
}

const technicalSeoData = createSlice({
    name: 'technicalSeo',
    initialState,
    reducers: {
        setTechnicalSeo: (state, action: PayloadAction<TechnicalSeoType>)=> {
            return action.payload;
        }
    }

})

export const {setTechnicalSeo} = technicalSeoData.actions;

export default technicalSeoData.reducer;
