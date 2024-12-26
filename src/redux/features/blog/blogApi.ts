import { baseApi } from "@/redux/api/baseApi";

const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: () => ({
                url: `/blogs`,
                method: 'GET',

            }),
            providesTags: ['blogs'],
        }),
        getBlogById: builder.query({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'GET',
            }),
            providesTags: ['blogs'],
        }),
        addBlog: builder.mutation({
            query: (blogInfo) => {
                return {
                    url: `/blogs`,
                    method: 'POST',
                    body: blogInfo,
                }
            },
            invalidatesTags: ['blogs'],
        }),
        updateBlog: builder.mutation({
            query: ({ id, blogInfo }) => {

                return {
                    url: `/blogs/${id}`,
                    method: 'PATCH',
                    body: blogInfo,
                };
            },
            invalidatesTags: ['blogs']
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['blogs'],
        }),


    })
})

export const { useAddBlogMutation, useGetAllBlogsQuery, useGetBlogByIdQuery, useUpdateBlogMutation, useDeleteBlogMutation } = blogApi;
