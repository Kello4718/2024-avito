import { Card, List, Typography } from 'antd';
import { SimilarMovie } from '../../types/types';
import React, { FC } from 'react';
import noImage from '../../assets/no-image.png';
import { Link } from 'react-router-dom';
import { scrollTop } from '../../utils/utils';

import styles from './SimilarMovies.module.css';

type SimilarMoviesProps = {
    similarMovies: SimilarMovie[];
};

const { Title } = Typography;

const SimilarMovies: FC<SimilarMoviesProps> = ({ similarMovies }) => {
    return (
        <section className={styles.container}>
            <Title level={2} className={styles.title}>
                Похожие фильмы
            </Title>
            <List
                pagination={{
                    position: 'bottom',
                    align: 'center',
                    hideOnSinglePage: true,
                    total: similarMovies.length,
                    pageSize: 3,
                    responsive: true,
                }}
                grid={{
                    gutter: [30, 30],
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 3,
                    xxl: 3,
                }}
                dataSource={similarMovies}
                renderItem={(item) => (
                    <List.Item>
                        <Link
                            to={`/movie/${item.id}`}
                            onClick={scrollTop}
                            className={styles.link}
                        >
                            <Card
                                hoverable
                                className={styles.movie}
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
                                <Title level={3} className={styles.movieTitle}>
                                    {item.name
                                        ? item.name
                                        : 'Нет информации о названии фильма 😒'}
                                </Title>
                            </Card>
                        </Link>
                    </List.Item>
                )}
            />
        </section>
    );
};

export default SimilarMovies;
