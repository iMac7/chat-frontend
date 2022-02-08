import React, {useState} from 'react'
import {Link} from 'react-router-dom'
export const AuthContext = React.createContext()

function SignIn(props) {

    let auth = false
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleClick =(e)=>{
        e.preventDefault()

        fetch("http://localhost:3001/signIn",{
            method: 'POST',
            headers : {
            'Content-Type' : 'application/json'
          },
          credentials: 'include',
          body:JSON.stringify(
            {email:email, password:password}
          )
        })
        .then(res=> {return res.json()})
        .then(parsedData => {
            console.log(parsedData)
            if(parsedData.email){
                auth = true 
                console.log(auth)
            }
        }) 
       }

    return (
        <AuthContext.Provider value={{auth: auth, color: 'red'}}>
            {props.children}
            <form>
                <h1>Log In</h1>

                <label htmlFor="email" style={{color:'red'}}>email</label>
                <input type="text" name='text' id='text'
                value={email}
                onChange={e=> setEmail(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input type="text" name='password' id='password'
                value={password}
                onChange={e=> setPassword(e.target.value)}/>

                <button onClick={handleClick}>Sign In</button>
                <div><Link to='/signUp'>Sign Up</Link></div>
                <div><Link to='/protected'>protected</Link></div>
                
                {console.log(auth)}

            </form>
        </AuthContext.Provider>
    )
}

export default SignIn
