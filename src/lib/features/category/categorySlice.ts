import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
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
  reducers: {
    changeCategory: (
      state,
      action: PayloadAction<{ [k: string]: string[] }>
    ) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { changeCategory } = categorySlice.actions;

export const selectCategory = (state: RootState) => state.category.value;

export const categoryReducer = categorySlice.reducer;
