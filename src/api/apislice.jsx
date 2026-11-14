import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),
  tagTypes: ["Products", "Users"],

  endpoints: (builder) => ({
    authUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"],
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    editProduct: builder.mutation({
      query: (newProduct) => ({
        url: `/products/${newProduct?.id}`,
        method: "PATCH",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useAuthUserMutation,
  useGetProductsQuery,
  useGetUsersQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useAddProductMutation,
} = apiSlice;
