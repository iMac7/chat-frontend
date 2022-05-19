import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../App'
import ImgUpload from '../Shared/ImgUpload'
import './tweetArea.css'


function TweetArea() {
  const {userdata,isLoggedIn,profilePic} = useContext(AuthContext)
  const {userID} = userdata

  const [isLoading, setIsLoading] = useState(false)
  const [post, setPost] = useState('')
  const [image, setImage] = useState()
  const [message, setMessage] = useState('')
     
  
  const handleClick =async (e)=>{
    e.preventDefault()
    const trimmed = post.trim()

    if(trimmed === '') {
      setMessage('text required')
      setTimeout(() => {
        setMessage('')
      }, 2000);
      return
    }
    
    const formdata = new FormData()
    formdata.append('content', trimmed)
    formdata.append('sender', userID)
    formdata.append('image', image)

    setImage()

    setIsLoading(true)

    await fetch("http://chatbaze.site/publicPost",{
        headers:{
          authorization: JSON.stringify(userdata)
        },
        method: 'POST',
          body: formdata
    })
    .then( res => {
      setIsLoading(false)
      return res.json()
    })
    .then(parsed => {
      console.log(parsed)
      if(typeof parsed === 'string'){
        setMessage(parsed)
        setTimeout(() => {
          setMessage('')
        }, 2000);
      }
      setPost('')
      setImage()
    })

    }


    return (
        isLoggedIn &&
         <div className="tweetBox">
              <div className="leftTweetNav">
                {!!profilePic === true && <img src={`http://chatbaze.site/${profilePic}`} className='dp' alt=''/>}
              </div>

              <div className="rightTweetNav">
                <textarea type="text" className='tweetInput' 
                rows={2} maxLength={100} required
                value={post}
                onChange={e=> setPost(e.target.value)}
                />

                <div className='rightLowerTweetNav'>

                  <ImgUpload id='image' childImage={setImage} />

                  <button id='tweetBtn' onClick={handleClick} 
                  disabled={isLoading? true: false}
                  >
                    {
                      isLoading? 
                      <svg className='loader' width="32px" height="32px" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg" fill="currentColor" color="#000000"><g transform="translate(1 1)" fillRule="evenodd"><circle cx="5" cy="50" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" values="50;5;50;50" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="cx" begin="0s" dur="2.2s" values="5;27;49;5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="27" cy="5" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" from="5" to="5" values="5;50;50;5" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="cx" begin="0s" dur="2.2s" from="27" to="27" values="27;49;5;27" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="49" cy="50" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" values="50;50;5;50" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="cx" from="49" to="49" begin="0s" dur="2.2s" values="49;5;27;49" calcMode="linear" repeatCount="indefinite"></animate></circle></g></svg>
                      :'POST'
                    }
                  </button>

                </div>
                    <p style={{color:"blue"}}>{message}</p>
            </div>
         </div>
    )
}

export default TweetArea
