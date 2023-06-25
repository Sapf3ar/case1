import { observer } from 'mobx-react-lite';

// import { useStores } from '../hooks/useStores';

import { Breadcrumb, Button, Layout } from 'antd';
import FileUpload from '../components/FileUpload';

import { Typography } from 'antd';
import ReportStatus from '../components/ReportStatus';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const Upload = observer(() => {
    // const { rootStore } = useStores();

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
                    <Title level={2}>Загрузка файлов</Title>
                    <FileUpload />
                    <ReportStatus />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                © 2023 / ФАУ «Главгосэкспертиза России».
            </Footer>
        </Layout>
    );
});

export default Upload;
