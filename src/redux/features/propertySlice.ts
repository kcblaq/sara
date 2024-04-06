import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    allProperty: [],
    activeProperty: ''
}

const propertySlice = createSlice({
    name:'property',
    initialState,
    reducers: {
        setAllProperty: (state,action) => {
            state.allProperty = action.payload
        },
        setActiveProperty: (state, action) => {
            state.activeProperty = action.payload
        }

    }
})

export const { setAllProperty, setActiveProperty} = propertySlice.actions;

export default propertySlice.reducer ;