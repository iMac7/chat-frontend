import React, {useState, useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../App'
import('./signIn.css')

function SignIn(props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {isLoggedIn} = useContext(AuthContext)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('password')


    useEffect(() => {
            if(isLoggedIn) navigate('/')
        }, [navigate, isLoggedIn])


    //send details
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
            if(typeof user === 'string'){
                setMessage(user)
                setTimeout(() => {
                    setMessage('')
                }, 2000);
            }
            if(user.userID){
                props.setProfilePic(user.dp)
                localStorage.setItem('userData',
                 JSON.stringify({ userID: user.userID, token: user.token, profilepic:user.dp}))
                props.login(true)
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
                        <div className="password">
                            <input type={type} name='password' className='signInFormInput'
                            value={password} required
                            onChange={e=> setPassword(e.target.value)}/>

                            {type === 'password' && <svg onClick={()=>setType('text')} width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="#000"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>}

                            {type === 'text' && <svg onClick={()=>setType('password')} width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="#000"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"></path><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path></svg>}
                        </div>
                    </div>

                    <p style={{color:'red'}}>{message}</p>    
                             
                    <div className="formElement">
                        <button className='authbtn' onClick={handleClick}>SIGN IN</button>
                    </div> 

                    <div className="formElement">
                        <Link to='/signUp'>Sign Up</Link>
                        {/* <Link to='/forgotPassword'>Forgot Password?</Link> */}
                    </div>
                    
                </form>
            </section>
    )
}

export default SignIn
