import React, {useState, useEffect, useContext} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { AuthContext } from '../Homepage'
import('./signIn.css')

function SignIn(props) {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {isLoggedIn} = useContext(AuthContext)


    useEffect(() => {
            if(isLoggedIn){
                navigate('/')
            }
        }, [navigate, isLoggedIn])


    const handleClick =(e)=>{
        e.preventDefault()

        fetch("http://localhost:3001/signIn",{
            method: 'POST',
            headers : {
            'Content-Type' : 'application/json',
        },
          credentials: 'include', 
          body:JSON.stringify(
            {email:email, password:password}
          )
        })
        .then(res=> {
            return res.json()
        })
        .then(user => {
            console.log(user);
            if(user.userID){
                localStorage.setItem('userData',
                 JSON.stringify({ userID: user.userID, email: user.email, token: user.token, sentAt:user.sentAt }))
                navigate('/')
            }
        })
    }


    return (
            <section className="signIn">
                <form className='signInForm'>

                    <div className="formElement">
                        <h2>Log in</h2>
                    </div>

                    <div className="formElement">
                    <label htmlFor="email" >EMAIL</label>
                    <input type="text" name='text' className='signInFormInput'
                    value={email} required
                    onChange={e=> setEmail(e.target.value)}/>
                    </div>

                    <div className="formElement">
                        <label htmlFor="password">PASSWORD</label>
                        <input type="text" name='password' className='signInFormInput'
                        value={password} required
                        onChange={e=> setPassword(e.target.value)}/>
                    </div>

                    <div className="formElement">
                        <button className='authbtn' onClick={handleClick}>SIGN IN</button>
                    </div>              

                    <div className="formElement">
                        <Link to='/signUp'>Sign Up</Link>
                        <Link to='/forgotPassword'>Forgot Password?</Link>
                    </div>
                    
                    {console.log(isLoggedIn)}
                </form>
            </section>
    )
}

export default SignIn
