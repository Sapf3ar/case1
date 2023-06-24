import { observer } from 'mobx-react-lite';

import { useStores } from '../hooks/useStores';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const ReportStatus = observer(() => {
    const { rootStore } = useStores();

    return (
        <div>
            {rootStore.reportUid && (
                <Link to={`/report/${rootStore.reportUid}`}>
                    <Button style={{ marginTop: 20 }} size='large' type='primary'>
                        Посмотреть отчет
                    </Button>
                </Link>
            )}
        </div>
    );
});

export default ReportStatus;
