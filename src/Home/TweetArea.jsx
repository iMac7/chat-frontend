import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Homepage'
import ImgUpload from '../Shared/ImgUpload'
import './tweetArea.css'


function TweetArea() {
  const {userdata} = useContext(AuthContext)
  const {userID, token} = userdata

  const [post, setPost] = useState('')
  const [image, setImage] = useState()
            
  const handleClick =(e)=>{
    e.preventDefault()
          
    const formdata = new FormData()
    formdata.append('content', post)
    formdata.append('sender', userID)
    formdata.append('image', image)
    
    fetch("http://localhost:3001/publicpost",{
        method: 'POST',
          body: formdata,
    })
    }


    return (
         <div className="tweetBox">
              <div className="leftTweetNav">
                <div className="dp"></div>
                <div></div>
              </div>

              <div className="rightTweetNav">
                <textarea type="text" className='tweetInput' 
                rows={2} maxLength={100} required
                value={post}
                onChange={e=> setPost(e.target.value)}
                />

              <div className='rightLowerTweetNav'>

                <ImgUpload id='image' childImage={setImage}/>

                <button id='tweetBtn' onClick={handleClick}>POST</button>

              </div>
            </div>
         </div>
    )
}

export default TweetArea
