import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type GlobalState = {
  country: string;
  dateTo: string;
  dateFrom: string;
};

const initialState: GlobalState = {
  country: "",
  dateTo: "",
  dateFrom: "",
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    onChangeCountry(state, action) {
      state.country = action.payload;
    },
    onChangeDate(
      state,
      action: PayloadAction<{ dateFrom: string; dateTo: string }>
    ) {
      state.dateFrom = action.payload.dateFrom;
      state.dateTo = action.payload.dateTo;
    },
  },
});

export default globalSlice.reducer;
export const { onChangeCountry, onChangeDate } = globalSlice.actions;
