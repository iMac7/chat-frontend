import React, {useState} from 'react'
import {Link} from 'react-router-dom'


function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClick =(e)=>{
        e.preventDefault()

        fetch("http://localhost:3001/signIn",{
            method: 'POST',
            headers : {
            'Content-Type' : 'application/json',
            'authorization' : 'jwt'
          },
          credentials: 'include',
          body:JSON.stringify(
            {email:email, password:password}
          )
        })
        .then(res=> {return res.json()})
        .then(parsedData => {
            console.log(parsedData)
        }) 
       }


    return (
        <div className='signIn'>
               <form className="signInForm">

                <div className="formElement">
                    <h1>Reset Password</h1>
                </div>
                
                <div className="formElement">
                    <label htmlFor="email" >EMAIL</label>
                    <input type="text" name='text' id='signInFormInput'
                    value={email}
                    onChange={e=> setEmail(e.target.value)}/>
                </div>

                <div className="formElement">
                    <Link to='/signUp'>Sign Up</Link>
                    <Link to='/signIn'>Sign In</Link>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword
