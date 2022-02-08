import React, {useContext} from 'react'
import { AuthContext } from './Auth/SignIn'



function Error() {
    const {color} = useContext(AuthContext)

    return (
        <div>
            Error 404 Page not found
        </div>
    )
}

export default Error
