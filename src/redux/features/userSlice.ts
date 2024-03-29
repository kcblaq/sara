import { UserType } from "@/types/userType";
import { createSlice } from "@reduxjs/toolkit";

const initialState : UserType = {
    user: {
        id: 0,
        email: "",
        fullName: "",
        account_type: "",
        createdAt: "",
        updatedAt: ""
    },
    message: '',
    token: ''
}

const userDetail = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
    
    }

})

export const { setUser, setToken} = userDetail.actions;

export default userDetail.reducer;