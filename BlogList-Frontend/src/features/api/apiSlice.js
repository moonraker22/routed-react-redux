import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'blogsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
  tagTypes: {
    blog: 'Blog',
    user: 'User',
  },
  endpoints: (builder) => ({
    // eslint-disable-next-line no-unused-labels
    getBlogs: builder.query({
      query: () => '/blogs',
      providesTags: ['Blogs'],
    }),
  }),
})

export const { useGetBlogsQuery } = apiSlice
