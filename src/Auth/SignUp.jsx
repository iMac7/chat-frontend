import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import './signUp.css'
import { Button } from '@mui/material'


function SignUp() {

    // const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

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
        }).then(res=> {if(res.userid){
            return history.push('/')
        }})
    

    }
    return (
        <form id='signUpForm'>
            <h1>SignUp</h1>
            {/* <label htmlFor="userName">Username</label>
            <input type="text" name='text' id='text'
            value={username}
            onChange={e=> setUsername(e.target.value)}/> */}

            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email'
            value={email}
            onChange={e=> setEmail(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password'
            value={password}
            onChange={e=> setPassword(e.target.value)}/>


            <Button onClick={handleClick} id='signUpButton'>Sign Up</Button>

        </form>
    )
}

export default SignUp
