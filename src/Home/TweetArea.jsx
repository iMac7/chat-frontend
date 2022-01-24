import React from 'react'
import { Avatar, Button } from '@mui/material'
import './tweetArea.css'

function TweetArea() {
    return (
         <div id="tweetBox">
            <Avatar className='avatar'/>
            <form id='tweetForm'>
                <input type="text" id='tweetInput' />
                <Button>Tweet</Button>
            </form>
         </div>
    )
}

export default TweetArea
