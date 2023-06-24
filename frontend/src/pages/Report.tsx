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
} from 'antd';
import FileUpload from '../components/FileUpload';

import ReportStatus from '../components/ReportStatus';
import FileList from '../components/FileList';

import { SettingOutlined } from '@ant-design/icons';

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const Report = observer(() => {
    const { rootStore } = useStores();

    const genExtra = () => (
        <SettingOutlined
            onClick={(event) => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
        />
    );

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Файл 1',
            children: <div>text</div>,
            extra: genExtra(),
        },
        {
            key: '2',
            label: 'Файл 2',
            children: <div>text</div>,
            extra: genExtra(),
        },
        {
            key: '3',
            label: 'Файл 3',
            children: <div>text</div>,
            extra: genExtra(),
        },
    ];

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
                        Наименование объекта капитального строительства – «Строительство и
                        обустройство скважин куста № 10 Гарюшкинского месторождения»
                    </Typography.Paragraph>

                    <Row gutter={16}>
                        <Col span={3}>
                            <Card bordered={false}>
                                <Statistic
                                    title='Обработано файлов'
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </Card>
                        </Col>
                        <Col span={3}>
                            <Card bordered={false}>
                                <Statistic
                                    title='Найдено совпадений'
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                        <Col span={3}>
                            <Card bordered={false}>
                                <Statistic
                                    title='Найдено ошибок'
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Row className='report__files' gutter={16}>
                        <Col span={6}>
                            <FileList />
                        </Col>
                        <Col span={16}>
                            <Collapse
                                defaultActiveKey={['1']}
                                expandIconPosition={'left'}
                                items={items}
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
