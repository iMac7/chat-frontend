import React, {useState, useEffect} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'

import('./signIn.css')

function SignIn(props) {

    const navigate = useNavigate()
    let auth = false
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // useEffect(() => {
    //         if(localStorage.getItem('userData'))
    //         // && Date.now() - JSON.parse(localStorage.getItem('userData')).createdAt < 1000*60*60*23.9){
    //            { navigate('/')
    //         }   
    //     }, [])


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
             JSON.stringify({ userID: user.userID, email: user.email, token: user.token, sentAt:user.sentAt }))
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
                    
                    {console.log(auth)}
                </form>
            </section>
    )
}

export default SignIn
