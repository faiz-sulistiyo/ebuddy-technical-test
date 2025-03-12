import { auth } from "@/libs/firebase";
import { AuthRequest } from "@ebuddy/types";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { deleteCookie, setCookie } from "cookies-next";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from "firebase/auth";
import { showToast } from "../toastSlice";
import { handleError } from "@/utils/firebaseAuth";

export const authApiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<User, AuthRequest>({
      queryFn: async (credentials) => {
        try {
          const { user } = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          setCookie("token", await user.getIdToken(), { maxAge: 60 * 60 * 24 });
          return { data: user };
        } catch (error) {
          return handleError(error);
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(showToast({ message: "Successfully logged in", severity: "success", duration: 2000 }));
        } catch (err) {
          dispatch(showToast({ message: (err as { error: { message: string } })?.error?.message || "Failed logging in", severity: "error", duration: 2000 }));
        }
      },
    }),

    register: builder.mutation<User, AuthRequest>({
      queryFn: async (credentials) => {
        try {
          const { user } = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
          setCookie("token", await user.getIdToken(), { maxAge: 60 * 60 * 24 });
          return { data: user };
        } catch (error) {
          return handleError(error);
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(showToast({ message: "Successfully registered user", severity: "success", duration: 2000 }));
        } catch (err) {
          dispatch(showToast({ message: (err as { error: { message: string } })?.error?.message || "Failed registering user", severity: "error", duration: 2000 }));
        }
      },
    }),

    logout: builder.mutation<null, void>({
      queryFn: async () => {
        try {
          await auth.signOut();
          deleteCookie("token");
          return { data: null };
        } catch (error) {
          return handleError(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice;