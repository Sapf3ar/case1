import { Descriptions } from 'antd';
import ReactDiffViewer from 'react-diff-viewer';
// import { Error } from '../api/models/reports-response.ts';

interface Error {
    description: string;
    subject: string;
    id: number;
    line: number;
    match: number;
    page: number;
}

type Props = {
    errors: Error[];
    refference: string;
};

const FileErrors = ({ errors, refference }: Props) => {
    return (
        <div>
            {errors.map((error) => {
                return (
                    <Descriptions
                        className='file-errors__description'
                        key={error.id}
                        title='Ошибка в файле'
                        bordered
                    >
                        <Descriptions.Item label='Тип ошибки'>
                            {error.description}
                        </Descriptions.Item>
                        <Descriptions.Item label='Ожидаемое наименование ОКС'>
                            {refference}
                        </Descriptions.Item>
                        <Descriptions.Item label='Фактическое наименование ОКС'>
                            {error.subject}
                        </Descriptions.Item>
                        <Descriptions.Item label='Разница' span={10}>
                            <ReactDiffViewer
                                oldValue={error.subject}
                                newValue={refference}
                                splitView={true}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label='Место в файле'>
                            страница {error.page}, строка {error.line}
                        </Descriptions.Item>
                    </Descriptions>
                );
            })}
        </div>
    );
};

export default FileErrors;
