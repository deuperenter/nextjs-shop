import { NumberObjectArray, StringObjectArray } from "./../../../types/utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "@/lib/handleData";

type CurrencyState = {
  value: {
    fulfilled: boolean;
    monUnitChart: StringObjectArray;
    exchangeRates: NumberObjectArray;
  };
};

const initialState: CurrencyState = {
  value: {
    fulfilled: false,
    monUnitChart: [],
    exchangeRates: [],
  },
};

export const fetchCurrency = createAsyncThunk("monUnitChart", async () => {
  const monUnitChart = await getData("http://localhost:3000/data/monUnitChart");
  const exchangeRates = await getData(
    "http://localhost:3000/data/exchangeRates"
  );
  return { monUnitChart, exchangeRates, fulfilled: true };
});

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrency.fulfilled, (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
    });
  },
});

export const currencyReducer = currencySlice.reducer;
