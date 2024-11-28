import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const blogBaseQuery = fetchBaseQuery({ baseUrl: " " });

export const apiBlog = createApi({
    reducerPath: "BlogApi", 
  baseQuery: blogBaseQuery,
  tagTypes: ["Blogs"] as BlogTag[],  
  endpoints: () => ({}),
})