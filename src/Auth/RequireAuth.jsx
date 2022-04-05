import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Homepage'

function RequireAuth() {
    const navigate = useNavigate()
    const {isLoggedIn} = useContext(AuthContext)    

    useEffect(() => {
        if(isLoggedIn===false){
            return navigate('/signin')
        }else{
            return navigate('/')
        }        
    }, [isLoggedIn,navigate])
    

}

export default RequireAuth