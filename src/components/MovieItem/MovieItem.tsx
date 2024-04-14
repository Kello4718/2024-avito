import { Card, List } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Movie } from '../../types/types';
import React, { FC } from 'react';

import styles from './MovieItem.module.css';
import { Link } from 'react-router-dom';

type MovieItemProps = {
    item: Movie;
};

const MovieItem: FC<MovieItemProps> = ({ item }) => {
    return (
        <List.Item>
            <Link to={`movie/${item.id}`}>
                <Card
                    hoverable
                    cover={
                        <img
                            className={styles.image}
                            alt="example"
                            src={item.poster.previewUrl}
                        />
                    }
                >
                    <Meta title={item.name} description="www.instagram.com" />
                </Card>
            </Link>
        </List.Item>
    );
};

export default MovieItem;
