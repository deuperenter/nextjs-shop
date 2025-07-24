import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

type CountryState = {
  value: string;
};

const initialState: CountryState = {
  value: "US",
};

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    changeCountry: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeCountry } = countrySlice.actions;

export const selectCountry = (state: RootState) => state.country.value;

export const countryReducer = countrySlice.reducer;
