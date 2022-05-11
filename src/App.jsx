import {BrowserRouter, Routes, Route, useLocation, useNavigate} from 'react-router-dom'
import React, { useEffect, useState, Suspense} from 'react'
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

import './app.css'
import Sidenav from './Sidenav/Sidenav'
import Home from './Home/Home'
// import SignUp from './Auth/SignUp'
// import SignIn from './Auth/SignIn'
// import ForgotPassword from './Auth/ForgotPassword'
import MobileNav from './Sidenav/MobileNav'
import { AnimatePresence } from 'framer-motion'
// import Profile from './Profile/Profile'

const SignUp = React.lazy(()=> import('./Auth/SignUp'))
const Profile = React.lazy(()=> import('./Profile/Profile'))
const SignIn = React.lazy(()=> import('./Auth/SignIn'))

export const AuthContext = React.createContext()
const queryClient = new QueryClient()

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [profilePic, setProfilePic] = useState('')
    const location = useLocation()

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem('userData'))
        if(userdata?.token) {
            setIsLoggedIn(true)
        }    
    }, [])
    

    const userdata = JSON.parse(localStorage.getItem('userData'))

    return (        
    <AuthContext.Provider value={{
        isLoggedIn:isLoggedIn,
        userdata: userdata,
        profilePic:profilePic      
        }}>
            <Suspense fallback={<h2>Loading...</h2>}>
            <QueryClientProvider client={queryClient}>
                <Sidenav className='sideNavComponent' logout={setIsLoggedIn}/>
                <MobileNav className='mobileNavComponent' logout={setIsLoggedIn}/>

                <Routes location={location} key={location.key}>

                    <Route path='/signUp' element={<SignUp/>} />    
                    <Route path='/signIn'element={<SignIn login={setIsLoggedIn}
                    setProfilePic={setProfilePic}
                    />}
                    />
                    {/* <Route path='/forgotPassword'element={<ForgotPassword/>}/> */}

                    <Route path='/' element={<Home/>}/>
                    <Route path='/profile'element={<Profile 
                    profilePic={profilePic} setProfilePic={setProfilePic}/>}
                    />

                </Routes>

            <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
            </QueryClientProvider>
            </Suspense>
    </AuthContext.Provider>
    )
}

export default App