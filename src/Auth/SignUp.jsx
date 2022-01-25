import React from 'react'
import './signUp.css'

function SignUp() {
    return (
        <form action="" id="signUpForm">
            <div>
                <label htmlFor="userName">Username</label>
                <input type="text" name='userName' id='userName signUpFormInput' />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="text" name='password' id='password signUpFormInput'
                width='100%' />
            </div>

        </form>
    )
}

export default SignUp
