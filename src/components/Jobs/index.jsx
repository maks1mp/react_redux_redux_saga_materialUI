import React, {useEffect} from 'react';
import { JOBS } from 'modules/api/endpoints';
import Navigation from 'components/common/Navigation';
import useFetch from 'hooks/useFetch';

export default function Jobs() {
    const {response, performFetch} = useFetch(JOBS);
    const {loading, data} = response;

    useEffect(() => {
        performFetch();
    }, [performFetch]);

    return <Navigation loading={loading} services={data} title={'react + redux + redux-saga app'} />;
}