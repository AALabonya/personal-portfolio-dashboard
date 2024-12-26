import { baseApi } from "@/redux/api/baseApi";

const experienceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllExperiences: builder.query({
            query: () => ({
                url: `/experience`,
                method: 'GET',

            }),
            providesTags: ['experience'],
        }),
        getExperienceById: builder.query({
            query: (id) => ({
                url: `/experience/${id}`,
                method: 'GET',
            }),
            providesTags: ['experience'],
        }),
        addExperience: builder.mutation({
            query: (experienceInfo) => {
                return {
                    url: `/experience`,
                    method: 'POST',
                    body: experienceInfo,
                }
            },
            invalidatesTags: ['experience'],
        }),
        updateExperience: builder.mutation({
            query: ({ id, experienceInfo }) => {

                return {
                    url: `/experience/${id}`,
                    method: 'PATCH',
                    body: experienceInfo,
                };
            },
            invalidatesTags: ['experience']
        }),
        deleteExperience: builder.mutation({
            query: (id) => ({
                url: `/experience/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['experience'],
        }),


    })
})

export const { useAddExperienceMutation, useGetAllExperiencesQuery, useGetExperienceByIdQuery, useUpdateExperienceMutation, useDeleteExperienceMutation } = experienceApi;
