import React from 'react'
import Sidenav from './Sidenav'
import Home from './Home'
import Trends from './Trends'
import './homepage.css'

function Homepage() {
    return (
        <div className="app">
        <Sidenav className='appComponent sidenav'/>
        <Home className='appComponent home'/>
        {/* <Trends className='appComponent trends'/> */}
        </div>
    )
}

export default Homepage

