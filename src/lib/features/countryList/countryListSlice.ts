import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "@/lib/handleData";

type CountryListState = {
  value: string[][];
};

const initialState: CountryListState = {
  value: [["US", "United States"]],
};

export const fetchCountryList = createAsyncThunk("countryList", async () => {
  const country = await getData("http://localhost:3000/data/country");
  return country;
});

export const countryListSlice = createSlice({
  name: "countryList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountryList.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const countryListReducer = countryListSlice.reducer;
