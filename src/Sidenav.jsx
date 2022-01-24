import React from 'react'
import AppIcon from '@mui/icons-material/ConnectWithoutContact';
import ChatIcon from '@mui/icons-material/Chat';
import { Button } from '@mui/material';

function Sidenav() {
    return (
        <nav className='nav'>
            <AppIcon/>
            <ChatIcon/>
            <ChatIcon/>
            <ChatIcon/>
            <ChatIcon/>
            <Button>tweet</Button>
        </nav>
    )
}

export default Sidenav
