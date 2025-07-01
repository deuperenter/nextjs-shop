import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

// Define a type for the slice state
interface CountryState {
  value: string; // This is just an example value; you can define your state here
}

// Define the initial state using that type
const initialState: CountryState = {
  value: "US",
};

export const countrySlice = createSlice({
  name: "country",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeCountry: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeCountry } = countrySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCountry = (state: RootState) => state.country.value;

export const countryReducer = countrySlice.reducer;
