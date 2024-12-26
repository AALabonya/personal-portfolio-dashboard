import { baseApi } from "@/redux/api/baseApi";

const skillApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSkills: builder.query({
            query: () => ({
                url: `/skills`,
                method: 'GET',

            }),
            providesTags: ['skills'],
        }),
        getSkillById: builder.query({
            query: (id) => ({
                url: `/skills/${id}`,
                method: 'GET',
            }),
            providesTags: ['skills'],
        }),
        addSkill: builder.mutation({
            query: (skillInfo) => {
                return {
                    url: `/skills`,
                    method: 'POST',
                    body: skillInfo,
                }
            },
            invalidatesTags: ['skills'],
        }),
        updateSkill: builder.mutation({
            query: ({ id, skillInfo }) => {

                return {
                    url: `/skills/${id}`,
                    method: 'PATCH',
                    body: skillInfo,
                };
            },
            invalidatesTags: ['skills']
        }),
        deleteSkill: builder.mutation({
            query: (id) => ({
                url: `/skills/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['skills'],
        }),


    })
})

export const { useAddSkillMutation, useGetAllSkillsQuery, useGetSkillByIdQuery, useUpdateSkillMutation, useDeleteSkillMutation } = skillApi;
