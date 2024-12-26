import { baseApi } from "@/redux/api/baseApi";

const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProjects: builder.query({
            query: () => ({
                url: `/projects`,
                method: 'GET',

            }),
            providesTags: ['projects'],
        }),
        getProjectById: builder.query({
            query: (id) => ({
                url: `/projects/${id}`,
                method: 'GET',
            }),
            providesTags: ['projects'],
        }),
        addProject: builder.mutation({
            query: (projectInfo) => {
                return {
                    url: `/projects`,
                    method: 'POST',
                    body: projectInfo,
                }
            },
            invalidatesTags: ['projects'],
        }),
        updateProject: builder.mutation({
            query: ({ id, projectInfo }) => {

                return {
                    url: `/projects/${id}`,
                    method: 'PATCH',
                    body: projectInfo,
                };
            },
            invalidatesTags: ['projects']
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/projects/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['projects'],
        }),


    })
})

export const { useAddProjectMutation, useGetAllProjectsQuery, useGetProjectByIdQuery, useUpdateProjectMutation, useDeleteProjectMutation } = projectApi;
