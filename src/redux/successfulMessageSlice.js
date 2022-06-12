import { createSlice } from "@reduxjs/toolkit";

const successfulMessageSlice = createSlice({
  name: "successfulMessage",
  initialState: {
    successfulMessage: null,
  },
  reducers: {
    setSuccessfulMessage: (state, action) => {
      state.successfulMessage = action.payload;
    },
  },
});

export const { setSuccessfulMessage } = successfulMessageSlice.actions;
export default successfulMessageSlice.reducer;
