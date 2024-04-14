import { AutoComplete, Col, Input, Row, Select } from 'antd';
import debounce from 'lodash/debounce';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getYears } from '../../utils/utils';
import { updateQueryParams } from '../../features/movies/moviesSlice';
import { useGetMoviesCountriesQuery } from '../../api/moviesApi';
import SearchResult from '../SearchResult/SearchResult';

import styles from './Header.module.css';

const ageRating = [
    {
        value: '0-13',
        label: 'Детям до 13 лет',
    },
    {
        value: '13-17',
        label: 'Лицам до 17 лет',
    },
    {
        value: '18',
        label: 'Взрослые',
    },
];

const Header = () => {
    const { queryParams } = useAppSelector((state) => state.movies);
    const dispatch = useAppDispatch();
    const { data: countries } = useGetMoviesCountriesQuery(undefined);

    const handleSearch = (query: string) => {
        dispatch(
            updateQueryParams({
                ...queryParams,
                query,
            }),
        );
    };

    return (
        <header className={styles.header}>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <AutoComplete
                        className={styles.search}
                        options={queryParams.perhapsMovies}
                        defaultValue={queryParams.query}
                        onSearch={debounce(handleSearch, 1000)}
                    >
                        <Input.Search
                            size='large'
                            placeholder='input here'
                            enterButton
                        />
                    </AutoComplete>
                </Col>
                {!queryParams.query ? (
                    <>
                        <Col span={8}>
                            <Select
                                className={styles.select}
                                onChange={(year: number) => {
                                    dispatch(
                                        updateQueryParams({
                                            ...queryParams,
                                            year,
                                        }),
                                    );
                                }}
                                placeholder='Год'
                                options={getYears()}
                                defaultValue={queryParams.year}
                            />
                        </Col>
                        <Col span={8}>
                            <Select
                                className={styles.select}
                                onChange={(country: string) => {
                                    dispatch(
                                        updateQueryParams({
                                            ...queryParams,
                                            country,
                                        }),
                                    );
                                }}
                                placeholder='Страна'
                                options={countries}
                                value={queryParams.country}
                            />
                        </Col>
                        <Col span={8}>
                            <Select
                                className={styles.select}
                                onChange={(ageRating: string) => {
                                    dispatch(
                                        updateQueryParams({
                                            ...queryParams,
                                            ageRating,
                                        }),
                                    );
                                }}
                                placeholder='Возрастной рейтинг'
                                options={ageRating}
                                defaultValue={queryParams.ageRating}
                            />
                        </Col>
                    </>
                ) : (
                    <Col span={24}>
                        <SearchResult />
                    </Col>
                )}
            </Row>
        </header>
    );
};

export default Header;
