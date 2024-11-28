import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: USERS_URL,
        method: "POST",
        body: userData,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) =>({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: (data)
      })
    }),
    removeAccount: builder.mutation<void, { id: string }>({
      query: () => ({
        url: `${USERS_URL}/profile/${id}`,
        method: "DELETE",
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: USERS_URL,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterUserMutation, useLogoutUserMutation,
  useUpdateUserMutation, useRemoveAccountMutation, useGetAllUserQuery
 } =
  userApiSlice;
