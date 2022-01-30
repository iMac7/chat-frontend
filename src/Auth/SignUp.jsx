import React, {useState} from 'react'

function SignUp() {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleClick =(e)=>{
        e.preventDefault()

        fetch("http://localhost:3001/",{
            method: 'POST',
            headers : {
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify(
            {name:userName, email:email, password: password}
          )
        })
        setUserName('')
        setEmail('')
        setPassword('')
       }

    return (
        <form action="/signIn">
            <h1>SignUp</h1>
            <label htmlFor="userName">Username</label>
            <input type="text" name='text' id='text'
            value={userName}
            onChange={e=> setUserName(e.target.value)}/>

            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email'
            value={email}
            onChange={e=> setEmail(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password'
            value={password}
            onChange={e=> setPassword(e.target.value)}/>


            <button onClick={handleClick}>Sign In</button>

        </form>
    )
}

export default SignUp
