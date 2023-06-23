import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../hooks/useStores';

const Page1 = observer(() => {
    const { rootStore } = useStores();

    return <div>{rootStore.isLoading ? 'loading...' : 'loaded'}</div>;
});

export default Page1;
