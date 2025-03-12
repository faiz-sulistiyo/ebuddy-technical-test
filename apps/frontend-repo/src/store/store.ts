import { configureStore } from "@reduxjs/toolkit";
import { userApiSlice } from "./api/user";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authApiSlice } from "./api/auth";
import { userSlice } from "./userSlice";
import { toastSlice } from "./toastSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    toast: toastSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "api/executeMutation/fulfilled",
          "api/executeMutation/rejected",
        ],
        ignoredPaths: [
          "api.mutations",
          "api.queries",
        ],
      },
    })
      .concat(userApiSlice.middleware)
      .concat(authApiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;