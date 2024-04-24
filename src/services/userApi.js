import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users/list",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
