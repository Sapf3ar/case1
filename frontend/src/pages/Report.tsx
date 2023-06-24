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
} from 'antd';
import FileUpload from '../components/FileUpload';
import { DownloadOutlined } from '@ant-design/icons';
import ReportStatus from '../components/ReportStatus';
import FileList from '../components/FileList';

import { SettingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import FileErrors from '../components/FileErrors';

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const Report = observer(() => {
    const { rootStore } = useStores();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        rootStore.fetchReports(id);
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

        return files.map((file) => {
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
                                    value={rootStore.report?.filesCount}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </Card>
                        </Col>
                        <Col span={3}>
                            <Card bordered={false}>
                                <Statistic
                                    title='Найдено совпадений'
                                    value={rootStore.report?.matchCount}
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
                            <Button icon={<DownloadOutlined />} type='primary'>
                                Загрузить отчет .csv
                            </Button>
                            <Button icon={<DownloadOutlined />} type='default'>
                                Загрузить отчет .pdf
                            </Button>
                        </Space>
                    </Row>

                    <Row className='report__files' gutter={16}>
                        <Col span={6}>
                            <FileList files={rootStore.report?.files} />
                        </Col>
                        <Col span={16}>
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
