import { ModalState, ReportType } from "@/types/modal";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ModalState = {
  value: { close: true },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.value = { close: true };
    },
    yesModal: (state, action: PayloadAction<string>) => {
      state.value = { yes: action.payload };
    },
    showModal: (state, action: PayloadAction<ModalState>) => {
      state.value = { ...action.payload.value };
    },
  },
});

export const { closeModal, yesModal, showModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
