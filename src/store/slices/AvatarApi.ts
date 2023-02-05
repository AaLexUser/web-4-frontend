import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import _Avatar from '../../types/Avatar'

export const avatarApi = createApi({
  reducerPath: 'avatarApi',
  tagTypes: ['Avatar'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1/', 
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8080/api/*',
    }
  }),
  endpoints: (build) => ({
    getAvatar: build.query<_Avatar, string>({
      query:(token) => ({
        url: 'get-avatar',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }),
      providesTags: [{ type: 'Avatar', id: 'AVATAR' }]
    }),
    setAvatar: build.mutation<void, {token: string, body: {url: string}}>({
      query: ({token, body}) => ({
        url: 'set-avatar',
        method: 'POST',
        body,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }),
      invalidatesTags: [{type: 'Avatar', id: 'AVATAR'}]
    })
  })
})

export const {useGetAvatarQuery, useSetAvatarMutation} = avatarApi

