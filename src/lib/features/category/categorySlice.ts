import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "@/lib/handleData";

interface CategoryState {
  value: { [k: string]: string[] };
}

const initialState: CategoryState = {
  value: {},
};

export const fetchCategory = createAsyncThunk("category", async () => {
  const category = await getData("http://localhost:3000/data/category");
  return category;
});

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
