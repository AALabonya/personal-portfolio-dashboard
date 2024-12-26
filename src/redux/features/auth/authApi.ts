import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signUP: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/signup',
                method: 'POST',
                body: userInfo,
            })
        }),
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo,
            }),
        }),
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: '/auth/forget-password',
                method: 'POST',
                body: { email },
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ id, password, token }) => ({
                url: '/auth/reset-password',
                method: 'POST',
                headers: {
                    Authorization: token,
                },
                body: { id, password },
            }),
        }),

    })
})

export const { useSignUPMutation, useLoginMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;