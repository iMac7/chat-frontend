import {BrowserRouter, Routes, Route, useLocation, useNavigate} from 'react-router-dom'
import React, { createContext, useEffect, useState } from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

import './homepage.css'
import Sidenav from './Sidenav/Sidenav'
import Home from './Home/Home'
import SignUp from './Auth/SignUp'
import SignIn from './Auth/SignIn'
import RequireAuth from './Auth/RequireAuth'
import ForgotPassword from './Auth/ForgotPassword'
import MobileNav from './Sidenav/MobileNav'
import Chatroom from './Chatroom/Chatroom'
import Profile from './Profile/Profile'
import Replies from './Replies/Replies'

export const AuthContext = React.createContext()
const queryClient = new QueryClient()

function Homepage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    
    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem('userData'))
        if(userdata?.token){
           setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
            navigate('/signin')
        }
    }, [isLoggedIn, navigate])

    const userdata = JSON.parse(localStorage.getItem('userData'))

    return (        
    <AuthContext.Provider value={{
        isLoggedIn:isLoggedIn,
        userdata: userdata        
        }}>
            <QueryClientProvider client={queryClient}>
            
                <Sidenav className='sideNavComponent'/>
                <MobileNav className='mobileNavComponent'/>

                <Routes location={location} key={location.key}>

                        <Route path='/signUp' element={<SignUp/>} />    
                        <Route path='/signIn'element={<SignIn/>}/>
                        <Route path='/forgotPassword'element={<ForgotPassword/>}/>

                        {isLoggedIn && <Route path='/' element={<Home/>}/>}
                        <Route path='/chatroom'element={<Chatroom/>}/>
                        <Route path='/profile'element={<Profile/>}/>
                        {/* <Route path='/replies/:id'element={<Replies/>}/> */}

                </Routes>

            <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
            </QueryClientProvider>
    </AuthContext.Provider>
    )
}

export default Homepage