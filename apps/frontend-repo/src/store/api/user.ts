import { BaseResponse, Pagination } from "@ebuddy/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";
import { User } from "@ebuddy/types";
import { showToast } from "@/store/toastSlice"; // Import toast action from Redux
import { setPagination } from "../userSlice";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = getCookie("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<BaseResponse<User[]>, Pagination>({
      query: (params) => `/users?page=${params.page}&limit=${params.limit}`,
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.page}-${queryArgs.limit}`; // Ensures cache keys change on page updates
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.meta?.pagination) {
            const { page, limit, totalItem } = data.meta.pagination; // Extract only serializable fields
            dispatch(setPagination({ page, limit, totalItem }));  
          }
        } catch {
          dispatch(showToast({ message: "Failed to fetch users", severity: "error", duration: 2000 }));
        }
      }
    }),

    updateUser: builder.mutation<BaseResponse<User>, { id: string; data: User }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(showToast({ message: "User updated successfully", severity: "success", duration: 2000 }));
        } catch {
          dispatch(showToast({ message: "Failed to update user", severity: "error", duration: 2000 }));
        }
      },
    }),

    insertUser: builder.mutation<BaseResponse<User>, User>({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(showToast({ message: "User created successfully", severity: "success", duration: 2000 }));
        } catch {
          dispatch(showToast({ message: "Failed to create user", severity: "error", duration: 2000 }));
        }
      },
    }),

    deleteUser: builder.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(showToast({ message: "User deleted successfully", severity: "success", duration: 2000 }));
        } catch {
          dispatch(showToast({ message: "Failed to delete user", severity: "error", duration: 2000 }));
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation, useInsertUserMutation, useDeleteUserMutation } = userApiSlice;