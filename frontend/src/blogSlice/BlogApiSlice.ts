import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Blog } from "../Types/userTypes";

const BLOG_URL = "/api/blogs";

const blogBaseQuery = fetchBaseQuery({
  baseUrl: " ", 
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.userInfo?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const BlogApiSlice = createApi({
  reducerPath: "BlogApi",
  baseQuery: blogBaseQuery,
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query<Blog[], void>({
      query: () => BLOG_URL,
    }),
    getUserBlogs: builder.query<Blog[], void>({
      query: () => `${BLOG_URL}/user`, 
    }),
    getBlogById: builder.query({
      query: (id) => `${BLOG_URL}/${id}`,
    }),

    createBlog: builder.mutation({
      query: (data) => ({
        url: BLOG_URL,
        method: "POST",
        body: data,
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BLOG_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { 
  useGetAllBlogsQuery, 
  useGetUserBlogsQuery, 
  useGetBlogByIdQuery, 
  useCreateBlogMutation, 
  useUpdateBlogMutation, 
  useDeleteBlogMutation 
} = BlogApiSlice;
