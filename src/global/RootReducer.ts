import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ContAPI } from "./ContAPI";

export const RootReducer = configureStore({
    reducer: {
        [ContAPI.reducerPath]: ContAPI.reducer,
    },   // gDM = getDefaultMiddleware
    middleware: (gDM) => gDM().concat(ContAPI.middleware),
});

setupListeners(RootReducer.dispatch);



