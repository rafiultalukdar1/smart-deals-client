import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router';
import Loading from '../pages/Loading/Loading';

const PrivetRoute = ({children}) => {

    const {user, loading} = use(AuthContext);

    if(loading) {
        return <Loading></Loading>;
    }

    if(user && user?.email ) {
        return children;
    }


    return <Navigate state={location.pathname} to='/login'></Navigate>;
};

export default PrivetRoute;