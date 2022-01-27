import './homepage.css'
import React from 'react'
import Sidenav from './Sidenav/Sidenav'
import Home from './Home/Home'
import Trends from './Trends/Trends'
import SignUp from './Auth/SignUp'
import SignIn from './Auth/SignIn'
import Error from './Error'
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

function Homepage() {
    return (
        <>
        <Router>
            <Switch>

                <Route exact path='/signUp'>
                    <SignUp/>
                    <Link to='/signIn'>Sign In</Link>
                </Route>

                <Route exact path='/signIn'>
                    <SignIn/>
                    <Link to='/signUp'>Sign Up</Link>

                </Route>

                <Route exact path='/'>
                    <div className="app">
                        <Sidenav className='appComponent sideNav'/>
                        <Home className='appComponent home'/>
                        <Trends className='appComponent trends'/>
                    </div>
                </Route>

                <Route path='*'>
                    <Error/>
                </Route>

            </Switch>
        </Router>    
        </>
    )
}

export default Homepage

