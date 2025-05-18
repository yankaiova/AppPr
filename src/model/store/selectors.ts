import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "./index";

export const getGlobal = (state: RootState) => state.global;

export const getDateTo = createSelector(getGlobal, (global) => {
  return global.dateTo;
});
export const getDateFrom = createSelector(getGlobal, (global) => {
  return global.dateFrom;
});
export const getCountry = createSelector(getGlobal, (global) => {
  return global.country;
});
