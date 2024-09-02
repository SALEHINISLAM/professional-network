import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'
const PrivateRoutes = ({children}) => {
    const {user, loading}=useContext(AuthContext)
    const location=useLocation()
    console.log(user, "from private route")
    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if (!user) {
        return <Navigate to={'/login'} state={{from:location}} replace/>
    }
    return children
};
PrivateRoutes.propTypes={
    children: PropTypes.node
}
export default PrivateRoutes;