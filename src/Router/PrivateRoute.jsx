import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import { AuthProvider } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthProvider);

    if (loading) {
        return <Loader></Loader>
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace ></Navigate>
    }

    return children;
};

export default PrivateRoute;