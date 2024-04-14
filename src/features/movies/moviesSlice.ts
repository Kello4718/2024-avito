import { createSlice } from '@reduxjs/toolkit';
import { SimilarMovie } from '../../types/types';
type MoviesState = {
    user: {
        login: string;
        password: string;
        isAuth: boolean;
    };
    queryParams: {
        page: number;
        limit: number;
        year: null | number;
        ageRating: string | null;
        country: string | null;
        query: string;
        perhapsMovies: SimilarMovie[];
    };
};

const initialState: MoviesState = {
    user: {
        login: '',
        password: '',
        isAuth: false,
    },
    queryParams: {
        page: 1,
        limit: 10,
        year: null,
        ageRating: null,
        country: null,
        query: '',
        perhapsMovies: [],
    },
};

export const MoviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            state.user = action.payload;
        },
        updateQueryParams: (state, action) => {
            state.queryParams = action.payload;
        },
    },
});

export const { updateUserData, updateQueryParams } = MoviesSlice.actions;

export default MoviesSlice.reducer;
