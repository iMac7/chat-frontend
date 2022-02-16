import React, {useState, useEffect} from 'react'
import './signUp.css' 
import {Link, useNavigate} from 'react-router-dom'


function SignUp() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        if(localStorage.getItem('authToken')){
            console.log(localStorage.getItem('authToken'));
            navigate('/signIn')
        }
        return () => {
            
        }
    }, [navigate])


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
        }).then(resJson =>{
            return resJson.json()
            // history.push('/signIn')
        // }).then(res=> {if(res.userid){
        //     return history.push('/')
        // }
    })
    

    }

    return (
        <section className="signIn">
            <form className='signInForm'>
                <h1 className='formElement'>Sign Up</h1>
                {/* <label htmlFor="userName">Username</label>
                <input type="text" name='text' id='text'
                value={username}
                onChange={e=> setUsername(e.target.value)}/> */}

                <div className="formElement">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='signInFormInput'
                    value={email}
                    onChange={e=> setEmail(e.target.value)}/>
                </div>

                <div className="formElement">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='signInFormInput'
                    value={password}
                    onChange={e=> setPassword(e.target.value)}/>
                </div>

                <div className="formElement">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name='password' id='signInFormInput'
                    value={confirmPassword}
                    onChange={e=> setConfirmPassword(e.target.value)}/>
                </div>

                <div className="formElement">
                    <button onClick={handleClick} id='signUpButton'>Sign Up</button>
                </div>

                <div className="formElement">
                    <Link to='/signIn'>Sign In</Link>
                    <Link to='/forgotPassword'>Forgot Password?</Link>
                </div>
                
                
            </form>
        </section>
    )
}

export default SignUp
