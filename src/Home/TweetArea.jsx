import React, { useState } from 'react'
import './tweetArea.css'

function TweetArea() {

    const [post, setPost] = useState('')

    const handleClick =(e)=>{
      e.preventDefault()

      fetch("http://localhost:3001/publicpost",{

            method: 'POST',
            headers : {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('userData')
          },
          body:JSON.stringify({
            post:post, 
            postedBy:localStorage.getItem('userData')
          }
            )
      })
      .then(res=> {return res.json()})
      .then(parsedData => {
            console.log(parsedData)
      })
      // .then(setPost(''))
    }

    return (
         <div className="tweetBox">
              <div className="leftTweetNav">
                <div className="dp"></div>
                <div></div>
              </div>

              <div className="rightTweetNav">
                <textarea type="text" className='tweetInput' 
                rows={2} maxLength={64} required
                value={post}
                onChange={e=> setPost(e.target.value)}
                />

              <div className='rightLowerTweetNav'>
                  <svg viewBox="0 0 24 24" aria-hidden="true" className='uploadIcon' ><g>
                    <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path><circle cx="8.868" cy="8.309" r="1.542"></circle></g>
                  </svg>
                  
                  <button id='tweetBtn' onClick={handleClick}>POST</button>
                  
              </div>
              {/* {localStorage.getItem(JSON.parse('userData').email)} */}
            </div>
         </div>
    )
}

export default TweetArea
