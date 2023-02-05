import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Point from '../../types/Point'


export const pointApi = createApi({
  reducerPath: 'pointApi',
  tagTypes: ['Points'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1/', 
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8080/api/*',
    }
  }),
  endpoints: (build) => ({
    getPoints: build.query({
      query:(token) => ({
        url: 'get-points',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Points' as const, id })),
            { type: 'Points', id: 'LIST' },
          ]
          : [{ type: 'Points', id: 'LIST' }],
    }),
    addPoint: build.mutation<void, {token: string, body: Point}>({
      query: ({token, body}) => ({
        url: 'add-point',
        method: 'POST',
        body,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }),
      invalidatesTags: [{type: 'Points', id: 'LIST'}]
    })
  })
})

export const {useGetPointsQuery, useAddPointMutation} = pointApi

