import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'

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
import {AuthProvider, AuthContext} from './Context/AuthProvider'

function Homepage() {
    // const auth = useContext(AuthContext)
    // let isLoggedIn = true
    
    // useEffect(() => {
    //     const userdata = JSON.parse(localStorage.getItem('userData')) 
    //     if(userdata){
    //        isLoggedIn = true
    //     }else{
    //         isLoggedIn = false
    //     }
    // }, [])
    

    return (
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

                </Routes>
            </BrowserRouter> 
    )
}

export default Homepage

