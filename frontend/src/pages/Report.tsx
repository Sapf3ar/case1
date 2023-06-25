import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../hooks/useStores';
import {
    Breadcrumb,
    Card,
    Col,
    Layout,
    Row,
    Statistic,
    Collapse,
    CollapseProps,
    Typography,
    Space,
    Button,
    Progress,
    Spin,
} from 'antd';

import { DownloadOutlined } from '@ant-design/icons';

import FileList from '../components/FileList';

import { SettingOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import FileErrors from '../components/FileErrors';
import { API_URL } from '../config';

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const calculateProgress = (totalFiles, processedFiles) => {
    return Math.round((processedFiles / totalFiles) * 100);
};

const Report = observer(() => {
    const { rootStore } = useStores();
    const { id } = useParams<{ id: string }>();
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        rootStore.fetchReports(id).then(() => {
            if (
                calculateProgress(rootStore.report?.filesCount, rootStore.report?.checkedCount) !==
                100
            ) {
                const maxRetry = 10;
                let retry = 0;

                const interval = setInterval(() => {
                    const newProgress = calculateProgress(
                        rootStore.report?.filesCount,
                        rootStore.report?.checkedCount
                    );

                    if (retry >= maxRetry) {
                        clearInterval(interval);
                    }
                    retry++;

                    if (newProgress !== 100) {
                        rootStore.fetchReports(id);
                        setProgress(newProgress);
                    } else {
                        setProgress(100);
                        clearInterval(interval);
                    }
                }, 5000);
            } else {
                setProgress(100);
            }
        });
    }, []);

    const genExtra = () => (
        <SettingOutlined
            onClick={(event) => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
        />
    );

    const getItems = (): CollapseProps['items'] => {
        if (!rootStore?.report) {
            return [];
        }

        const files = rootStore.report.files;

        return files?.map((file) => {
            return {
                key: file.id,
                label: file.filename,
                extra: genExtra(),
                children: (
                    <FileErrors refference={rootStore.report?.reference} errors={file.errors} />
                ),
            };
        });
    };

    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className='demo-logo' />
                <Link to='/'>
                    <Button className='file-upload__button' type='primary' size='large'>
                        Загрузка файлов
                    </Button>
                </Link>
                {/* <Link to='/'>
                    <Button
                        style={{ marginLeft: 20 }}
                        className='file-upload__button'
                        type='primary'
                        size='large'
                    >
                        Пример отчета
                    </Button>
                </Link> */}
            </Header>
            <Content className='site-layout' style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Загрузка файлов</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    className='content'
                    style={{ padding: 24, minHeight: 380, background: '#ffffff' }}
                >
                    <Row>
                        {progress !== 100 && (
                            <Col span={1}>
                                <Spin />
                            </Col>
                        )}
                        <Col span={progress !== 100 ? 23 : 24}>
                            <Progress
                                style={{ width: '100%' }}
                                percent={progress}
                                status={progress === 100 ? 'success' : 'active'}
                            />
                        </Col>
                    </Row>
                    <Title level={2}>Обработанные файлы</Title>

                    <Typography.Paragraph>
                        Наименование объекта капитального строительства –{' '}
                        {rootStore.report?.reference}
                    </Typography.Paragraph>

                    <Row gutter={16}>
                        <Col span={3}>
                            <Card bordered={false}>
                                <Statistic
                                    title='Обработано файлов'
                                    value={rootStore.report?.checkedCount}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </Card>
                        </Col>
                        <Col span={3}>
                            <Card bordered={false}>
                                <Statistic
                                    title='Всего файлов'
                                    value={rootStore.report?.filesCount}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </Card>
                        </Col>
                        <Col span={3}>
                            <Card bordered={false}>
                                <Statistic
                                    title='Найдено ошибок'
                                    value={rootStore.report?.errorsCount}
                                    precision={0}
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 20 }}>
                        <Space wrap>
                            <a href={`${API_URL}/get-csv/${id}`} target='_blank' rel='noreferrer'>
                                <Button
                                    // disabled={progress === 100 ? false : true}
                                    icon={<DownloadOutlined />}
                                    type='primary'
                                >
                                    Загрузить отчет .csv
                                </Button>
                            </a>
                            <a href={`${API_URL}/get-pdf/${id}`} target='_blank' rel='noreferrer'>
                                <Button
                                    // disabled={progress === 100 ? false : true}
                                    icon={<DownloadOutlined />}
                                    type='default'
                                >
                                    Загрузить отчет .pdf
                                </Button>
                            </a>
                            {progress !== 100 && (
                                <p>Загрузка будет доступна после обработки всех файлов</p>
                            )}
                        </Space>
                    </Row>

                    <Row className='report__files' gutter={16}>
                        <Col span={6}>
                            <FileList files={rootStore.report?.files} />
                        </Col>
                        <Col span={18}>
                            <Collapse
                                defaultActiveKey={['1']}
                                expandIconPosition={'start'}
                                items={getItems()}
                            />
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                © 2023 / ФАУ «Главгосэкспертиза России».
            </Footer>
        </Layout>
    );
});

export default Report;
