import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { createContext, useState, useCallback} from 'react'

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

export const AuthContext = createContext(
    {
        isLoggedIn:false,
        login: ()=>{},
        logout:()=>{}}
        )

function Homepage() {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const logIn= useCallback(()=>{}, [])
    const logOut= useCallback(()=>{}, [])

    return (
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn, logIn:logIn, logOut:logOut}}>
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
                        
                        
                        {/* <Route path='*' element={<Error/>} /> */}

                </Routes>
            </BrowserRouter> 
        </AuthContext.Provider>
    )
}

export default Homepage

