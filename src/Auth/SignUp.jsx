import React, {useState, useEffect, useContext} from 'react'
import './signUp.css' 
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../App'

function SignUp() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [username, setUsername] = useState("")
    const [message, setMessage] = useState('')

    const {isLoggedIn} = useContext(AuthContext)

    const handleClick =(e)=>{
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('passwords do not match')
            setTimeout(() => {
                setMessage('')
            }, 2000);
            return
        }
        if( 
            email.trim() === '' ||
            password.trim() === '' ||
            username.trim() === ''
            ){
            setMessage('all fields required')
            setTimeout(() => {
                setMessage('')
            }, 2000);
            return
        }



        fetch("http://localhost:3001/signUp",{
            method: 'POST',
            headers : {
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify(
            { email:email, password: password, username: username}
          )
        })
        .then(res=> {return res.json()})
        .then(user => {
            if(user){
                if(user==='login') navigate('/signin')
                if(typeof user === 'string'){
                    setMessage(user)
                    setTimeout(() => {
                        setMessage('')
                    }, 2000);    
            }}
        })    
    }

    return (
        <section className="signIn">
            <form className='signInForm'>
                <h2 className='formElement'>Sign Up</h2>

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
                    <label htmlFor="username">CHOOSE USERNAME</label>
                    <input type="text" name='username' className='signInFormInput'
                    value={username} required
                    onChange={e=> setUsername(e.target.value)}/>
                </div>

                <p style={{color:'red'}}>{message}</p>             

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
