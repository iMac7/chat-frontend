import React, { useState } from 'react'
import { Avatar, Button } from '@mui/material'
import './tweetArea.css'

function TweetArea() {

    const [inputValue, setInputValue] = useState('')

    const handleClick =(e)=>{
        e.preventDefault()

        fetch("http://localhost:3001/",{
            method: 'POST',
            headers : {
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify(
            {name:inputValue}
          )
        })

        setInputValue('')
      
    }

    return (
         <div id="tweetBox">
            <Avatar className='avatar'/>
            <form id='tweetForm'>
                <input type="text" id='tweetInput' value={inputValue}
                onChange={e=> setInputValue(e.target.value)} />
                <Button onClick={handleClick}>Tweet</Button>
            </form>
         </div>
    )
}

export default TweetArea
