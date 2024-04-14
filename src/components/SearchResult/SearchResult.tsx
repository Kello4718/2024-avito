import { Card, List } from 'antd';
import { useGetMoviesBySearchQuery } from '../../api/moviesApi';
import { useAppSelector } from '../../app/hooks';
import { Movie } from '../../types/types';
import Meta from 'antd/es/card/Meta';

import noImage from '../../assets/no-image.png';
import styles from './SearchResult.module.css';
import { Link } from 'react-router-dom';
import React from 'react';

const SearchResult = () => {
    const { queryParams } = useAppSelector((state) => state.movies);
    const { data: perhapsMovies } = useGetMoviesBySearchQuery(queryParams);
    return (
        <List
            className={styles.list}
            dataSource={perhapsMovies}
            renderItem={(item: Movie) => (
                <List.Item key={item.id}>
                    <Link to={`movie/${item.id}`} className={styles.link}>
                        <Card
                            hoverable
                            className={styles.card}
                            cover={
                                <img
                                    width={200}
                                    height={200}
                                    className={styles.image}
                                    alt={item.name}
                                    src={
                                        item.poster.previewUrl
                                            ? item.poster.previewUrl
                                            : noImage
                                    }
                                />
                            }
                        >
                            <Meta
                                title={
                                    item.name
                                        ? item.name
                                        : 'Нет информации о названии фильма 😒'
                                }
                                description={
                                    item.description
                                        ? item.description
                                        : 'Нет информации об описании к фильму 😒'
                                }
                            />
                        </Card>
                    </Link>
                </List.Item>
            )}
        />
    );
};

export default SearchResult;
