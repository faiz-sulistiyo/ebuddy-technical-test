import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

interface ToastState {
    open: boolean;
    message: string;
    severity: AlertColor;
    duration: number;
}
const initialState: ToastState = {
  open: false,
  message: "",
  severity: "success",
  duration: 3000,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      const { message, severity, duration } = action.payload;
      state.open = true;
      state.message = message;
      state.severity = severity || "success";
      state.duration = duration || 3000;
    },
    hideToast: (state) => {
      state.open = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
