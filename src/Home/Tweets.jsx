import { Avatar } from '@mui/material'
import React from 'react'
import './tweets.css'

function Tweets() {
    return (
        <div className='tweets'>
            <br />
            <Avatar/>
            <div className="tweetContent">
                <div className="@"> ESPN</div>
                <div id="tweetContent">
                    Agbaji sends it to double overtime
                </div>
            </div>
        </div>
    )
}

export default Tweets
