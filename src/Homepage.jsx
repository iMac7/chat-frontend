import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { createContext, useEffect, useState } from 'react'

import './homepage.css'
import Sidenav from './Sidenav/Sidenav'
import Home from './Home/Home'
import Trends from './Trends/Trends'
import SignUp from './Auth/SignUp'
import SignIn from './Auth/SignIn'
import Error from './Error'
import RequireAuth from './Auth/RequireAuth'
import ForgotPassword from './Auth/ForgotPassword'
import MobileNav from './Sidenav/MobileNav'
import Chatroom from './Chatroom/Chatroom'
import Profile from './Profile/Profile'

export const AuthContext = React.createContext()

function Homepage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const {userdata} = JSON.parse(localStorage.getItem('userData'))
        if(userdata){
           setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }
    }, [isLoggedIn])

    const userdata = JSON.parse(localStorage.getItem('userData'))


    return (
    <AuthContext.Provider value={{
        isLoggedIn:isLoggedIn,
        userdata: userdata        
        }}>
        <BrowserRouter>
                <Routes>
                        <Route path='/signUp' element={<SignUp/>} />    
                        <Route path='/signIn'element={<SignIn/>}/>
                        <Route path='/forgotPassword'element={<ForgotPassword/>}/>

                        <Route path='/' element={
                            <div className="app">
                                <Sidenav className='appComponent sideNav'/>
                                {/* <MobileNav/> */}
                                <Home className='appComponent home'/>
                                {/* <Trends className='appComponent trends'/> */}
                            </div>
                        }/>

                        {/* <Route element={<RequireAuth/>}/> */}
                        <Route path='/protected' element={
                                <div className='protected'>
                                <h1>protected</h1>
                                </div>
                            }/>

                        <Route path='/chatroom'element={<Chatroom/>}/>

                        <Route path='/profile'element={<Profile/>}/>
                       
                        {/* <Route path='*' element={<Error/>} /> */}
                        {console.log(isLoggedIn)}

                </Routes>
            </BrowserRouter>
            </AuthContext.Provider>

    )
}

export default Homepage

