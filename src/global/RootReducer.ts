import { configureStore } from "@reduxjs/toolkit";
import { ContAPI } from "./ContAPI";

export const RootReducer = configureStore({
    reducer: {
        [ContAPI.reducerPath]: ContAPI.reducer,
    },   // gDM = getDefaultMiddleware
    middleware: (gDM) => gDM().concat(ContAPI.middleware),
});


