import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import {
    KinopoiskCountriesData,
    KinopoiskData,
    KinopoiskPosters,
    KinopoiskReview,
    Movie,
} from '../types/types';

const API_URL = 'https://api.kinopoisk.dev/';
const TOKEN = 'WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M';

export const moviesApi = createApi({
    tagTypes: ['Movies'],
    reducerPath: 'moviesApi',
    baseQuery: retry(
        fetchBaseQuery({
            baseUrl: API_URL,
        }),
        { maxRetries: 3 },
    ),
    endpoints: (build) => ({
        getMoviesData: build.query({
            query: (queryParams) => {
                const {
                    page = 1,
                    limit = 10,
                    year,
                    country,
                    ageRating,
                    query,
                } = queryParams;
                return {
                    url: `v1.4/movie?page=${page}&limit=${limit}${
                        year ? `&year=${year}` : ''
                    }${country ? `&countries.name=${country}` : ''}${
                        query ? `&query=${query}` : ''
                    }${ageRating ? `&ageRating=${ageRating}` : ''}`,
                    headers: {
                        accept: 'application/json',
                        'X-API-KEY': TOKEN,
                    },
                    method: 'GET',
                };
            },
            providesTags: ['Movies'],
            transformResponse: (response: KinopoiskData) => response.docs,
        }),
        getMoviesCountries: build.query({
            query: () => {
                return {
                    url: `v1/movie/possible-values-by-field?field=countries.name`,
                    headers: {
                        accept: 'application/json',
                        'X-API-KEY': TOKEN,
                    },
                    method: 'GET',
                };
            },
            transformResponse: (response: KinopoiskCountriesData) => {
                return response.map((item) => ({
                    label: item.name,
                    value: item.name,
                }));
            },
        }),
        getMoviesBySearch: build.query({
            query: (queryParams) => {
                const { page = 1, limit = 10, query } = queryParams;
                return {
                    url: `v1.4/movie/search?page=${page}&limit=${limit}${
                        query ? `&query=${query}` : ''
                    }`,
                    headers: {
                        accept: 'application/json',
                        'X-API-KEY': TOKEN,
                    },
                    method: 'GET',
                };
            },
            transformResponse: (response: KinopoiskData) => response.docs,
        }),
        getMovieById: build.query({
            query: (id: number | string) => {
                return {
                    url: `v1.4/movie/${id}`,
                    headers: {
                        accept: 'application/json',
                        'X-API-KEY': TOKEN,
                    },
                    method: 'GET',
                };
            },
            transformResponse: (response: Movie) => response,
        }),
        getMovieReview: build.query({
            query: (id: number | string) => {
                return {
                    url: `v1.4/review?limit=20&movieId=${id}`,
                    headers: {
                        accept: 'application/json',
                        'X-API-KEY': TOKEN,
                    },
                    method: 'GET',
                };
            },
            transformResponse: (response: KinopoiskReview) => response.docs,
        }),
        getMoviePosters: build.query({
            query: (id: number | string) => {
                return {
                    url: `v1.4/image?&limit=20&movieId=${id}`,
                    headers: {
                        accept: 'application/json',
                        'X-API-KEY': TOKEN,
                    },
                    method: 'GET',
                };
            },
            transformResponse: (response: KinopoiskPosters) => response.docs,
        }),
    }),
});

export const {
    useGetMoviesDataQuery,
    useLazyGetMoviesDataQuery,
    useGetMoviesCountriesQuery,
    useGetMoviesBySearchQuery,
    useGetMovieByIdQuery,
    useGetMovieReviewQuery,
    useGetMoviePostersQuery,
} = moviesApi;
