import React, {useContext} from 'react'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import {AuthContext} from './SignIn'


function RequireAuth() {
    const {auth} = useContext(AuthContext)
    const location = useLocation()

    return (
        auth === true ? <Outlet/>
        : <Navigate to='/signIn' state={{from:location}} replace />
    )
}

export default RequireAuth
