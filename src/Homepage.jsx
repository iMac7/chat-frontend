import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, {useContext} from 'react'
import './homepage.css'
import Sidenav from './Sidenav/Sidenav'
import Home from './Home/Home'
import Trends from './Trends/Trends'
import SignUp from './Auth/SignUp'
import SignIn from './Auth/SignIn'
import Error from './Error'
import RequireAuth from './Auth/RequireAuth'

function Homepage() {

    return (
            <BrowserRouter>
                <Routes>
                    <Route path='/signUp' element={<SignUp/>} />    
                    <Route path='/signIn'element={<SignIn/>}/>

                    <Route path='/' element={
                            <div className="app">
                                <Sidenav className='appComponent sideNav'/>
                                <Home className='appComponent home'/>
                                <Trends className='appComponent trends'/>
                            </div>
                        }/>

                    <Route element={<RequireAuth/>}>
                    <Route path='/protected' element={
                            <div className='protected'>
                            <h1>protected</h1>
                            </div>
                        }/>
                    </Route>
                    
                    <Route path='*' element={<Error/>} />

                </Routes>
            </BrowserRouter>             
    )
}

export default Homepage

