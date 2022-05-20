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
    const [type, setType] = useState('password')


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
        if(password.length<4){
            setMessage('password too short')
            setTimeout(() => {
                setMessage('')
            }, 2000);
            return
        }



        fetch("https://chatbaze.site/signUp",{
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
                    <div className="password">
                        <input type={type} name='password' className='signInFormInput'
                        value={password} required
                        onChange={e=> setPassword(e.target.value)}/>
                        
                        {type === 'password' && <svg onClick={()=>setType('text')} width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="#000"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>}

                        {type === 'text' && <svg onClick={()=>setType('password')} width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="#000"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"></path><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path></svg>}

                    </div>
                </div>

                <div className="formElement">
                    <label htmlFor="password">CONFIRM PASSWORD</label>
                    <div className="password">
                        <input type={type} name='password' className='signInFormInput'
                        value={confirmPassword} required
                        onChange={e=> setConfirmPassword(e.target.value)}/>
                        
                        {type === 'password' && <svg onClick={()=>setType('text')} width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="#000"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>}

                        {type === 'text' && <svg onClick={()=>setType('password')} width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="#000"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"></path><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path></svg>}


                    </div>
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
                    {/* <Link to='/forgotPassword'>Forgot Password?</Link> */}
                </div>
                
                
            </form>
        </section>
    )
}

export default SignUp
