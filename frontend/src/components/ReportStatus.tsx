import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../hooks/useStores';

const ReportStatus = observer(() => {
    const { rootStore } = useStores();

    return <div>{rootStore.reportUid}</div>;
});

export default ReportStatus;
