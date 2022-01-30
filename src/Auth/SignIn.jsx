import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

function SignIn() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()


    const handleClick =(e)=>{
        e.preventDefault()

        fetch("http://localhost:3001/signIn",{
            method: 'POST',
            headers : {
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify(
            {email:email, password:password}
          )
        })
        .then(res=> {return res.json()})
        .then(parsedData => {
          console.log(parsedData)
          // history.push('/')
        })
        
    
       }

    return (
        <form>
            <h1>Log In</h1>

            <label htmlFor="email">email</label>
            <input type="text" name='text' id='text'
            value={email}
            onChange={e=> setEmail(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input type="text" name='password' id='password'
            value={password}
            onChange={e=> setPassword(e.target.value)}/>

            <button onClick={handleClick}>Sign In</button>

        </form>
    )
}

export default SignIn
