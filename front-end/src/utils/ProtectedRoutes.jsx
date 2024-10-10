import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const ProtectedRoutes = () => {
    const { auth, loading } = useContext(AuthContext);

    // Show a loader or nothing until the auth check is done
    if (loading) return;

    // Once loading is done, decide whether to render the protected routes or redirect
    return (
        auth ? <Outlet /> : <Navigate to='/login' />
    );

};

export default ProtectedRoutes;
