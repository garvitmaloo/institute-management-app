import { configureStore } from "@reduxjs/toolkit";

import batchFormSlice from "./batch-form-slice";

const store = configureStore({
  reducer: {
    batchForm: batchFormSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
