import { createSlice } from "@reduxjs/toolkit";

type activePropertyType = {
  id: number;
  userId: number;
  domain: string;
  createdAt: string;
  updatedAt: string;
};

const initialState: {
  allProperty: any[];
  activeProperty: string;
  activePropertyObj: activePropertyType;
} = {
  allProperty: [],
  activeProperty: "",
  activePropertyObj: {
    id: 0,
    userId: 0,
    domain: "",
    createdAt: "",
    updatedAt: "",
  },
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setAllProperty: (state, action) => {
      state.allProperty = action.payload;
    },
    setActiveProperty: (state, action) => {
      state.activeProperty = action.payload;
    },
    setActivePropertyObj: (state, action) => {
      state.activePropertyObj = action.payload;
    },
  },
});

export const { setAllProperty, setActiveProperty, setActivePropertyObj } =
  propertySlice.actions;

export default propertySlice.reducer;
