import React, {useState} from 'react'

function SignUp() {

    const [userName, setUserName] = useState("")

    const handleClick =(e)=>{
        e.preventDefault()

        fetch("http://localhost:3001/",{
            method: 'POST',
            headers : {
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify(
            {name:userName}
          )
        })
        setUserName('')
       }

    return (
        <form action="/signIn">
            <h1>SignUp</h1>
            <label htmlFor="userName">Username</label>
            <input type="text" name='text' id='text'
            value={userName}
            onChange={e=> setUserName(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input type="text" name='password' id='password'/>

            <button onClick={handleClick}>Sign In</button>

        </form>
    )
}

export default SignUp
