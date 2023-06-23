import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { message, Upload, Button } from 'antd';

import type { RcFile } from 'antd/es/upload/interface';
import { set } from 'mobx';
import { ApiServiceInstanse } from '../api/ApiService';
import { useStores } from '../hooks/useStores';

const { Dragger } = Upload;

const FileUpload = () => {
    const { rootStore } = useStores();

    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [uploading, setUploading] = React.useState(false);

    const handleUpload = () => {
        setUploading(true);

        ApiServiceInstanse.uploadFileList(fileList)
            .then((data) => {
                setFileList([]);

                rootStore.setReportId(data.id);

                message.success('Файлы успешно загружены. Производится обработка.');
            })
            .catch(() => {
                message.error('Ошибка загрузки файлов. Попробуйте еще раз.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file, newfileList) => {
            setFileList([...fileList, ...newfileList]);

            return false;
        },
    };

    return (
        <>
            <div className='file-upload'>
                <Dragger {...props} disabled={uploading}>
                    <p className='ant-upload-drag-icon'>
                        <InboxOutlined />
                    </p>
                    <p className='ant-upload-text'>
                        Нажмите или перетащите файл в эту область для загрузки
                    </p>
                    <p className='ant-upload-hint'>
                        Поддерживается одиночная или массовая загрузка.
                    </p>
                </Dragger>
                <Button
                    className='file-upload__button'
                    type='primary'
                    size='large'
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                >
                    {uploading ? 'Файлы обрабатываются' : 'Отправить'}
                </Button>
            </div>
        </>
    );
};

export default FileUpload;
