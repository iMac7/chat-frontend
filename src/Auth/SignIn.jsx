import React, {useState, useEffect} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'

import('./signIn.css')

function SignIn(props) {

    const navigate = useNavigate()
    let auth = false
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if(localStorage.getItem('authToken')){
            console.log(localStorage.getItem('authToken'));
            navigate('/')
        }
    }, [navigate])


    const handleClick =(e)=>{
        e.preventDefault()

        fetch("http://localhost:3001/signIn",{
            method: 'POST',
            headers : {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('userData')
        },
          credentials: 'include',
          body:JSON.stringify(
            {email:email, password:password}
          )
        })
        .then(res=> {return res.json()})
        .then(user => {
            localStorage.setItem('userData',
             JSON.stringify({ userID: user.userID, email: user.email, token: user.token }))
        })
       }


    return (
            <section className="signIn">
                <form className='signInForm'>

                    <div className="formElement">
                        <h1>Log In</h1>
                    </div>

                    <div className="formElement">
                    <label htmlFor="email" >EMAIL</label>
                    <input type="text" name='text' id='signInFormInput'
                    value={email}
                    onChange={e=> setEmail(e.target.value)}/>
                    </div>

                    <div className="formElement">
                        <label htmlFor="password">PASSWORD</label>
                        <input type="text" name='password' id='signInFormInput'
                        value={password}
                        onChange={e=> setPassword(e.target.value)}/>
                    </div>

                    <div className="formElement">
                        <button onClick={handleClick}>Sign In</button>
                    </div>              

                    <div className="formElement">
                        <Link to='/signUp'>Sign Up</Link>
                        <Link to='/forgotPassword'>Forgot Password?</Link>
                    </div>
                    
                    {console.log(auth)}

                </form>
            </section>
    )
}

export default SignIn
