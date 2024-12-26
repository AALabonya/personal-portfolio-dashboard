import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url:`/users/me`,
                method: 'GET',
            }),
            providesTags: ['users'],
        }),
        updateProfile: builder.mutation({
            query: (userInfo) => ({
                url:`/users/me`,
                method: 'PATCH',
                body: userInfo,
            }),
            invalidatesTags: ['users'],
        }),
        getAllUsers: builder.query({
            query: () => ({
                url:`/users`,
                method:'GET',
            }),
            providesTags: ['users'],
        }),
        promoteUser: builder.mutation({
            query: (id) => ({
                url: `/users/promote/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['users'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['users'],
        })
       
        })
    })

    export const { useGetProfileQuery, useUpdateProfileMutation, useGetAllUsersQuery, usePromoteUserMutation, useDeleteUserMutation } = userApi;

