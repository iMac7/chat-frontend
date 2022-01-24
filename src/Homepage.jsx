import React from 'react'
import Sidenav from './Sidenav/Sidenav'
import Home from './Home/Home'
import Trends from './Trends/Trends'
import './homepage.css'

function Homepage() {
    return (
        <div className="app">
        <Sidenav className='appComponent sideNav'/>
        <Home className='appComponent home'/>
        <Trends className='appComponent trends'/>
        </div>
    )
}

export default Homepage

