import { Avatar, Button, Card, Descriptions, Divider, Flex, Image, List, Rate, Spin, Typography } from 'antd';
import styles from './Movie.module.css';
import React, { useLayoutEffect } from 'react';
import noImage from '../../assets/no-image.png';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useGetMovieByIdQuery,
    useGetMoviePostersQuery,
    useGetMovieReviewQuery,
} from '../../api/moviesApi';
import Paragraph from 'antd/es/typography/Paragraph';
import SimilarMovies from '../../components/SimilarMovies/SimilarMovies';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Movie = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        data: movie,
        isSuccess,
        isFetching,
    } = useGetMovieByIdQuery(id ?? '');
    const { data: reviews } = useGetMovieReviewQuery(id ?? '');
    const { data: posters } = useGetMoviePostersQuery(id ?? '');
    const rating = movie && movie.rating.imdb / 2;

    useLayoutEffect(() => {
        window.document.title = movie?.name
    }, [movie])

    return (
        <>
            {isFetching && (
                <Spin spinning={isFetching} fullscreen size='large' />
            )}
            {isSuccess && (
                <section className={styles.container}>
                    <Button
                        type='link'
                        icon={<ArrowLeftOutlined />}
                        size='large'
                        onClick={() => navigate('/')}
                    >
                        Назад на главную
                    </Button>
                    <Card
                        className={styles.movie}
                        cover={
                            <img
                                width={200}
                                height={200}
                                className={styles.image}
                                alt={movie.name}
                                src={
                                    movie.poster.previewUrl
                                        ? movie.poster.previewUrl
                                        : noImage
                                }
                            />
                        }
                    >
                        <Title className={styles.title}>
                            {movie.name
                                ? movie.name
                                : 'Нет информации о названии фильма 😒'}
                        </Title>
                        <Paragraph
                            ellipsis={{
                                rows: 3,
                                expandable: true,
                                symbol: 'more',
                            }}
                        >
                            {movie.description
                                ? movie.description
                                : 'Нет информации об описании к фильму 😒'}
                        </Paragraph>
                        <Divider />
                        <Title level={2}>Рейтинг фильма</Title>

                        <Flex align='center' gap={20}>
                            <Text strong className={styles.rating}>
                                {rating}
                            </Text>
                            <Rate value={rating} disabled allowHalf />
                        </Flex>
                        <Divider />
                        <Title level={2}>Актеры фильма</Title>
                        <List
                            pagination={{
                                position: 'bottom',
                                align: 'start',
                                hideOnSinglePage: true,
                                pageSize: 5,
                            }}
                            grid={{
                                xs: 2,
                                sm: 4,
                                md: 2,
                                lg: 2,
                                xl: 3,
                                xxl: 5,
                                gutter: [20, 20],
                            }}
                            dataSource={movie.persons}
                            renderItem={(item) => (
                                <List.Item className={styles.actor}>
                                    <Flex vertical gap={20}>
                                        <Text italic strong>
                                            {item.name}
                                        </Text>
                                        <Avatar
                                            size={100}
                                            icon={
                                                <img
                                                    width={50}
                                                    height={50}
                                                    className={styles.image}
                                                    alt={movie.name}
                                                    src={item.photo}
                                                />
                                            }
                                        />
                                    </Flex>
                                </List.Item>
                            )}
                        />
                        <Divider />
                        <Title level={2}>
                            Постеры к {movie.isSeries ? 'сериалу' : 'фильму'}
                        </Title>
                        <List
                            pagination={{
                                position: 'bottom',
                                align: 'start',
                                hideOnSinglePage: true,
                                pageSize: 5,
                            }}
                            grid={{
                                xs: 1,
                                sm: 1,
                                md: 1,
                                lg: 1,
                                xl: 1,
                                xxl: 3,
                                gutter: [20, 20],
                            }}
                            className={styles.postersList}
                            dataSource={posters}
                            renderItem={(item) => (
                                <List.Item className={styles.poster}>
                                    <Image
                                        width={200}
                                        src={item.url}
                                        className={styles.posterImage}
                                    />
                                </List.Item>
                            )}
                        />

                        {movie.isSeries && (
                            <>
                                <Divider />
                                <Title level={2}>Сезоны</Title>
                                <List
                                    pagination={{
                                        position: 'bottom',
                                        align: 'start',
                                        hideOnSinglePage: true,
                                        pageSize: 5,
                                    }}
                                    grid={{ column: 5, gutter: 40 }}
                                    dataSource={movie.seasonsInfo}
                                    renderItem={(item, index) => {
                                        const data = [item].map((element) => ({
                                            key: index,
                                            label: element.number,
                                            children: element.episodesCount,
                                        }));
                                        return (
                                            <List.Item className={styles.actor}>
                                                <Descriptions
                                                    bordered
                                                    title='Сезон / Кол-во серий'
                                                    size='middle'
                                                    items={data}
                                                />
                                            </List.Item>
                                        );
                                    }}
                                />
                                <Divider />
                            </>
                        )}
                    </Card>
                    <List
                        pagination={{
                            position: 'bottom',
                            align: 'start',
                            hideOnSinglePage: true,
                            pageSize: 2,
                        }}
                        grid={{ column: 1, gutter: [40, 40] }}
                        dataSource={reviews}
                        renderItem={(review) => {
                            const time = new Date(review.date).toLocaleString(
                                'ru',
                            );
                            return (
                                <List.Item className={styles.actor}>
                                    <Card>
                                        <Flex align='center' gap={50}>
                                            <Paragraph
                                                className={styles.authorName}
                                            >
                                                {review.author}
                                            </Paragraph>
                                            <Paragraph
                                                className={styles.authorDate}
                                            >
                                                {time}
                                            </Paragraph>
                                        </Flex>

                                        <Paragraph
                                            className={styles.authorTitle}
                                        >
                                            {review.title}
                                        </Paragraph>
                                        <Paragraph
                                            className={styles.authorText}
                                            ellipsis={{
                                                rows: 3,
                                                expandable: true,
                                                symbol: 'more',
                                            }}
                                        >
                                            {review.review}
                                        </Paragraph>
                                    </Card>
                                </List.Item>
                            );
                        }}
                    />
                    <Divider />
                    <SimilarMovies similarMovies={movie.similarMovies} />
                </section>
            )}
        </>
    );
};

export default Movie;
