import { observer } from 'mobx-react-lite';

// import { useStores } from '../hooks/useStores';

import { Breadcrumb, Layout } from 'antd';
import FileUpload from '../components/FileUpload';

import { Typography } from 'antd';
import ReportStatus from '../components/ReportStatus';

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
                {/* <Menu
                    theme='dark'
                    mode='horizontal'
                    defaultSelectedKeys={['2']}
                    items={new Array(3).fill(null).map((_, index) => ({
                        key: String(index + 1),
                        label: `nav ${index + 1}`,
                    }))}
                /> */}
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
