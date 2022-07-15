/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'blogsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: {
    blog: 'Blog',
    blogs: 'Blogs',
    user: 'User',
  },
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => '/blogs',
      providesTags: ['Blogs'],
      transformResponse: (response) =>
        response.sort((a, b) => b.likes - a.likes),
    }),
    getBlog: builder.query({
      query: (id) => `/blogs/${id}`,
      providesTags: ['Blog'],
    }),
    createBlog: builder.mutation({
      query: (blog) => ({
        url: '/blogs',
        body: blog,
        method: 'POST',
      }),
      invalidatesTags: ['Blogs'],
    }),
    updateBlog: builder.mutation({
      query: (blog) => ({
        url: `/blogs/${blog.id}`,
        body: blog,
        method: 'PUT',
      }),
      invalidatesTags: ['Blog', 'Blogs'],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog', 'Blogs'],
    }),
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
    }),
  }),
})

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetUsersQuery,
} = apiSlice
