import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store';
import { logout, setUser } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://protfolio-server-xi.vercel.app/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});


const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // if (result?.error?.status === 404) {
  //   toast.error(result.error.data.message);
  // }
  // if (result?.error?.status === 403) {
  //   toast.error(result.error.data.message);
  // }
  if (result?.error?.status === 401) {
    //* Send Refresh
    // console.log('Sending refresh token');

    const res = await fetch('https://protfolio-server-xi.vercel.app/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};



// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['projects', 'blogs', 'skills', 'experience','users'],
  endpoints: () => ({}),
})