import React, { useState, useEffect } from 'react'
import ImgUpload from '../Shared/ImgUpload'
import './tweetArea.css'

function TweetArea() {

    const [post, setPost] = useState('')
    const [image, setImage] = useState()
    
    
    
    // useEffect(() => {
      //   if(image){
        //    console.log(image);
        //   }
        // }, [image])
        
        const handleClick =(e)=>{
          e.preventDefault()
          
          const formdata = new FormData()
          formdata.append('post', post)
          formdata.append('sender', localStorage.getItem('userData'))
          formdata.append('image', image)

          console.log(image);

    //   for (var value of formdata.values()) {
    //     console.log(value);
    //  }
    
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
                rows={2} maxLength={64} required
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
