import { Card, Tree, Input } from 'antd';
import React from 'react';
import { CarryOutOutlined } from '@ant-design/icons';

import type { DataNode, TreeProps } from 'antd/es/tree';

const { Search } = Input;
const treeData: DataNode[] = [
    {
        title: 'parent 1-1',
        key: '0-0-1',
    },
    {
        title: 'parent 1-2',
        key: '0-0-2',
    },
    {
        title: 'parent 1-3',
        key: '0-0-3',
    },
];

const FileList = () => {
    return (
        <>
            <Card className='file-list' title='Файлы' bordered={true} style={{ width: 300 }}>
                <div>
                    <Search
                        style={{ marginBottom: 8 }}
                        placeholder='Поиск'
                        onChange={() => console.log('search')}
                    />
                    <Tree showLine={true} treeData={treeData} />
                </div>
            </Card>
        </>
    );
};

export default FileList;
