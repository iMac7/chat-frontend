import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import React, { createContext, useEffect, useState } from 'react'
import {motion, AnimatePresence} from 'framer-motion'

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
import Settings from './Settings/Settings'

export const AuthContext = React.createContext()

function Homepage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const location = useLocation()
    const routeVariants = {
        hidden:{
            opacity: 0
        },
        visible:{
            opacity:1,
            transition: {delay: 1.5, duration:0.5 }
        },
        exit:{
            y: "-100vh",
            transition: {ease: "easeInOut"}
        }
    }

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
            
                <Sidenav className='sideNavComponent'/>
                <MobileNav className='mobileNavComponent'/>

                <Routes location={location} key={location.key}>

                        <Route path='/signUp' element={<SignUp/>} />    
                        <Route path='/signIn'element={<SignIn/>}/>
                        <Route path='/forgotPassword'element={<ForgotPassword/>}/>

                        <Route path='/' element={<Home/>}/>

                        <Route path='/chatroom'element={<Chatroom/>}/>

                        <Route path='/profile'element={<Profile/>}/>

                        <Route path='/settings'element={<Settings/>}/>

                       
                        {/* <Route path='*' element={<Error/>} /> */}
                        {console.log(new Date().toLocaleString())}

                </Routes>
    </AuthContext.Provider>

    )
}

export default Homepage

