import { Button, List, Pagination, Result, Spin } from 'antd';
import MovieItem from '../../components/MovieItem/MovieItem';

import {
    useGetMoviesDataQuery,
    useLazyGetMoviesDataQuery,
} from '../../api/moviesApi';
import { updateQueryParams } from '../../features/movies/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Header from '../../components/Header/Header';

import styles from './Home.module.css';
import { scrollTop } from '../../utils/utils';
import React, { useEffect } from 'react';

const MAX_MOVIES = 500;

const Home = () => {
    const { queryParams } = useAppSelector((state) => state.movies);
    const { ageRating, country, limit, page, query, year } = queryParams;
    const {
        data: movies,
        isFetching,
        isError,
    } = useGetMoviesDataQuery(queryParams, {});
    const [getMovies] = useLazyGetMoviesDataQuery(undefined);

    useEffect(() => {
        const pageParametr = page ? `?page=${page}` : '';
        const limitParametr = limit ? `&limit=${limit}` : '';
        const yearParametr = year ? `&year=${year}` : '';
        const countryParametr = country ? `&countries.name=${country}` : '';
        const ageRatingParametr = ageRating ? `&ageRating=${ageRating}` : '';
        const queryParametr = query ? `&query=${query}` : '';
        window.history.replaceState(
            null,
            null,
            `${pageParametr}${limitParametr}${yearParametr}${countryParametr}${ageRatingParametr}${queryParametr}`,
        );
    }, [queryParams]);

    const dispatch = useAppDispatch();

    return (
        <>
            <div className={styles.container}>
                {isFetching && (
                    <Spin spinning={isFetching} fullscreen size='large' />
                )}
                {!isError ? (
                    <>
                        <Header />
                        <List
                            className={styles.list}
                            grid={{
                                gutter: [30, 30],
                                xs: 1,
                                sm: 1,
                                md: 2,
                                lg: 2,
                                xl: 3,
                                xxl: 4,
                            }}
                            dataSource={movies}
                            renderItem={(item) => (
                                <MovieItem key={item.id} item={item} />
                            )}
                        />

                        <Pagination
                            hideOnSinglePage
                            defaultCurrent={page}
                            defaultPageSize={limit}
                            total={MAX_MOVIES}
                            onChange={(page, limit) => {
                                dispatch(
                                    updateQueryParams({
                                        ...queryParams,
                                        page,
                                        limit,
                                    }),
                                );
                                scrollTop();
                            }}
                        />
                    </>
                ) : (
                    <Result
                        status='error'
                        title='Ошибка'
                        subTitle='Давайте попробуем получить данные еще раз! 😊'
                        extra={[
                            <Button key='reload' onClick={() => getMovies(1)}>
                                Загрузить данные
                            </Button>,
                        ]}
                    />
                )}
            </div>
        </>
    );
};

export default Home;
