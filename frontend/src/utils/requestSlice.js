import { createSlice } from "@reduxjs/toolkit";

const requestSice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },

  },
});

export const { addRequests, removeRequest } = requestSice.actions;
export default requestSice.reducer;
