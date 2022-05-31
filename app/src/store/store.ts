import { configureStore } from "@reduxjs/toolkit";
import linksReducer from "../slices/linksSlice";

export const store = configureStore({
  reducer: {
    links: linksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
