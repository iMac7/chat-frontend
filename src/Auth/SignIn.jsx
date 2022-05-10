import React, {useState, useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../App'
import('./signIn.css')

function SignIn(props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {isLoggedIn, profilepic} = useContext(AuthContext)
    const [message, setMessage] = useState('')


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
            console.log(user);
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
                        <input type="text" name='password' className='signInFormInput'
                        value={password} required
                        onChange={e=> setPassword(e.target.value)}/>
                    </div>

                    <p style={{color:'red'}}>{message}</p>    
                             
                    <div className="formElement">
                        <button className='authbtn' onClick={handleClick}>SIGN IN</button>
                    </div> 

                    <div className="formElement">
                        <Link to='/signUp'>Sign Up</Link>
                        <Link to='/forgotPassword'>Forgot Password?</Link>
                    </div>
                    
                </form>
            </section>
    )
}

export default SignIn
