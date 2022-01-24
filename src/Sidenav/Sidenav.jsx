import React from 'react'
import AppIcon from '@mui/icons-material/ConnectWithoutContact';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';
import './sidenav.css'

function Sidenav() {
    return (
        <nav className='nav'>

            {/* <AppIcon fontSize='large' className='appIcon icon'/> */}

            <div className="navItem">
                <HomeIcon fontSize='large' className='icon'/>
                <div className="iconLabel">Home</div>
            </div>
            
            <div className="navItem">
                <ChatIcon fontSize='large' className='icon'/>
                <div className="iconLabel">label</div>
            </div>
            
            <div className="navItem">
                <ChatIcon fontSize='large' className='icon'/>
                <div className="iconLabel">label</div>
            </div>

            <Button id='tweetBtn'>tweet</Button>
        
        </nav>
    )
}

export default Sidenav
