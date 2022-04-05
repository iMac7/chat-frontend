import React, {useState, useEffect, useContext} from 'react'
import './signUp.css' 
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../Homepage'

function SignUp() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const {isLoggedIn} = useContext(AuthContext)

    // useEffect(() => {
    //     if(isLoggedIn===true){
    //         console.log(isLoggedIn);
    //         navigate('/')
    //     }
    // }, [navigate, isLoggedIn])

    const handleClick =(e)=>{
        e.preventDefault()

        fetch("http://localhost:3001/signUp",{
            method: 'POST',
            headers : {
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify(
            { email:email, password: password}
          )
        })
        .then(res=> {return res.json()})
        .then(user => {
            if(user){
                console.log(user);
                // localStorage.setItem('userData',
                // JSON.stringify({ userID: user.userID, email: user.email, token: user.token, sentAt:user.sentAt}))
                // navigate('/signIn')
            }
        })    
    }

    return (
        <section className="signIn">
            <form className='signInForm'>
                <h2 className='formElement'>Sign Up</h2>
                {/* <label htmlFor="userName">Username</label>
                <input type="text" name='text' id='text'
                value={username}
                onChange={e=> setUsername(e.target.value)}/> */}
                {console.log(isLoggedIn)}

                <div className="formElement">
                    <label htmlFor="email">EMAIL</label>
                    <input type="email" name='email' className='signInFormInput'
                    value={email} required
                    onChange={e=> setEmail(e.target.value)}/>
                </div>

                <div className="formElement">
                    <label htmlFor="password">PASSWORD</label>
                    <input type="password" name='password' className='signInFormInput'
                    value={password} required
                    onChange={e=> setPassword(e.target.value)}/>
                </div>

                <div className="formElement">
                    <label htmlFor="password">CONFIRM PASSWORD</label>
                    <input type="password" name='password' className='signInFormInput'
                    value={confirmPassword} required
                    onChange={e=> setConfirmPassword(e.target.value)}/>
                </div>

                <div className="formElement">
                    <button onClick={handleClick} className='authbtn'>SIGN UP</button>
                </div>

                <div className="formElement">
                    <Link to='/signIn'>Already have an account? Sign In</Link>
                    <Link to='/forgotPassword'>Forgot Password?</Link>
                </div>
                
                
            </form>
        </section>
    )
}

export default SignUp
