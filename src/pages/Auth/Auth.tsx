import { Button, Flex, Form, Input, Result, Typography } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateUserData } from '../../features/movies/moviesSlice';
import React, { useEffect, useState } from 'react';

import styles from './Auth.module.css';

type FieldType = {
    login: string;
    password: string;
};

const { Title } = Typography;

const DEFAULT_TIMEOUT = 3;

const Auth = () => {
    const [counter, setCounter] = useState(DEFAULT_TIMEOUT);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.movies);
    const onFinish = (value: FieldType) => {
        dispatch(updateUserData({ ...value, isAuth: true }));
    };

    useEffect(() => {
        if (user.isAuth) {
            if (counter !== 1) {
                setTimeout(() => setCounter(counter - 1), 1000);
            } else {
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        }
    }, [navigate, user.isAuth, counter]);

    return (
        <Flex justify='center' align='center' className={styles.container}>
            {!user.isAuth ? (
                <Flex
                    justify='center'
                    align='center'
                    vertical
                    gap={'30px'}
                    className={styles.content}
                >
                    <Title className={styles.title}>
                        Давайте сначала авторизуемся! 😁
                    </Title>
                    <Form
                        name='basic'
                        labelCol={{ span: 8 }}
                        labelAlign={'left'}
                        wrapperCol={{ span: 16 }}
                        onFinish={onFinish}
                        autoComplete='off'
                        className={styles.form}
                        initialValues={{
                            login: 'Senior AVITO',
                            password: 'senior+pomidor',
                        }}
                    >
                        <Form.Item<FieldType>
                            label='Логин'
                            name='login'
                            rules={[
                                {
                                    required: true,
                                    message: 'Такого логина нет 😒',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label='Пароль'
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Пароль не подходит 😢',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Button type='primary' htmlType='submit'>
                            Войти в систему
                        </Button>
                    </Form>
                </Flex>
            ) : (
                <Flex
                    justify='center'
                    align='center'
                    vertical
                    gap={'30px'}
                    className={styles.content}
                >
                    <Result
                        icon={<SmileOutlined />}
                        title={`Прекрасно, вы вошли в систему. А теперь ждем ${counter} ${
                            counter === 1 ? 'секунду' : 'секунды'
                        } 🙌`}
                    />
                </Flex>
            )}
        </Flex>
    );
};

export default Auth;
