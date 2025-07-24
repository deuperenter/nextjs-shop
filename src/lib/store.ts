import { configureStore } from "@reduxjs/toolkit";
import { countryListReducer } from "./features/countryList/countryListSlice";
import { countryReducer } from "./features/country/countrySlice";
import { categoryReducer } from "./features/category/categorySlice";
import { currencyReducer } from "./features/currency/currency";
import { modalReducer } from "./features/modal/modalSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      countryList: countryListReducer,
      country: countryReducer,
      category: categoryReducer,
      currency: currencyReducer,
      modal: modalReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
