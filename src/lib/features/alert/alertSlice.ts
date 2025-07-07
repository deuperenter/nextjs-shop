import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  value: Array<string>; // This is just an example value; you can define your state here
}

const initialState: AlertState = {
  value: [],
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    changeAlert: (state, action: PayloadAction<Array<string>>) => {
      state.value = action.payload;
    },
  },
});

export const { changeAlert } = alertSlice.actions;

export const alertReducer = alertSlice.reducer;
