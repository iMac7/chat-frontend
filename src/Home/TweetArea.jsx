import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Homepage'
import ImgUpload from '../Shared/ImgUpload'
import './tweetArea.css'


function TweetArea() {
  const {userdata} = useContext(AuthContext)
  const {userID, token} = userdata

  const [isLoading, setIsLoading] = useState(false)
  const [post, setPost] = useState('')
  const [image, setImage] = useState()
            
  
  const handleClick =async (e)=>{
    e.preventDefault()
    
    const formdata = new FormData()
    formdata.append('content', post)
    formdata.append('sender', userID)
    formdata.append('image', image)

    setIsLoading(true)

    await fetch("http://localhost:3001/publicPost",{
        method: 'POST',
          body: formdata
    })
    .then( res => res.json())
    .then(parsed => console.log(parsed))
    
    setIsLoading(false)

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

                <button id='tweetBtn' onClick={handleClick} 
                // disabled={isLoading? true: false}
                >
                  {
                    isLoading? 
                    <svg className='loader' width="32px" height="32px" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg" fill="currentColor" color="#000000"><g transform="translate(1 1)" fillRule="evenodd"><circle cx="5" cy="50" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" values="50;5;50;50" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="cx" begin="0s" dur="2.2s" values="5;27;49;5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="27" cy="5" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" from="5" to="5" values="5;50;50;5" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="cx" begin="0s" dur="2.2s" from="27" to="27" values="27;49;5;27" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="49" cy="50" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" values="50;50;5;50" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="cx" from="49" to="49" begin="0s" dur="2.2s" values="49;5;27;49" calcMode="linear" repeatCount="indefinite"></animate></circle></g></svg>
                    :'POST'
                  }
                </button>

              </div>
            </div>
         </div>
    )
}

export default TweetArea
