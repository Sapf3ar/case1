import { Card, Tree, Input } from 'antd';
import React from 'react';
import { CarryOutOutlined } from '@ant-design/icons';

import type { DataNode, TreeProps } from 'antd/es/tree';
import { ProcessedFile } from '../api/models';

const { Search } = Input;

type Props = {
    files: ProcessedFile[];
};

const FileList = ({ files }: Props) => {
    const [searchValue, setSearchValue] = React.useState('');

    const getTreeData = (): DataNode[] => {
        return files
            ?.filter((file) => {
                return file.filename.includes(searchValue);
            })
            .map((file) => {
                return {
                    title: file.filename,
                    key: file.id,
                };
            });
    };

    return (
        <>
            <Card className='file-list' title='Файлы' bordered={true} style={{ width: 300 }}>
                <div>
                    <Search
                        style={{ marginBottom: 8 }}
                        placeholder='Поиск'
                        onChange={(event) => setSearchValue(event.target.value)}
                    />
                    <Tree
                        onSelect={([selectedKeys]) => {
                            console.log(selectedKeys);
                        }}
                        showLine={true}
                        treeData={getTreeData()}
                    />
                </div>
            </Card>
        </>
    );
};

export default FileList;
