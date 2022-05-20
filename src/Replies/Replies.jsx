import React, { useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import reactdom from 'react-dom'
import { useQuery } from 'react-query'
import { AuthContext } from '../App'
import './replies.css'


function Replies({ postID, closeModal }) {
  const { userdata } = useContext(AuthContext)
  const [post, setPost] = useState('')

  //fetching with usequery
  const fetchData = async () => {
    return fetch(`https://chatbaze.site/publicposts/${postID}/replies`, {
    headers: {
      authorization: JSON.stringify(userdata),
    },
  })
  .then((res) => res.json())}

  const { isLoading, data } = useQuery('fetchdata', fetchData,{
    refetchInterval: 10000,
  })

  // send reply
  const handleClick = async (e) => {

    if(post.trim() === ''){
      setPost('text required')
      setTimeout(() => {
        setPost('')
      }, 1000);
      return
    }

    await fetch(`https://chatbaze.site/publicposts/${postID}/replies`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization':JSON.stringify(userdata)
      },
      method: 'POST',
      body: JSON.stringify({ post: post.trim(), sender: userdata })
    })
      .then((res) => res.json())
      .then(parsed => {
        if(parsed === 'reply sent !'){
          setPost(parsed)
          setTimeout(() => {
            setPost('')
          }, 1000);
        }
      })
      
  }

  //like & unlike button
  async function handleLikeClick(id) {
    await fetch('https://chatbaze.site/likePost', {
      headers: {
        'content-type': 'application/json',
        'authorization': JSON.stringify(userdata)
      },
      body:
        JSON.stringify({ senderID: userdata.userID, postID: id }),
      method: 'POST',
    })
      .then(res => res.json())
      .then(parsed => {
        console.log(parsed)
      })

  }
  
  //delete the main post
  const handlePostDelete = async (id) => {
await fetch(`https://chatbaze.site/publicPost/${id}/delete`, {
  method: 'DELETE',
  headers: {
    'authorization': JSON.stringify(userdata),
  }
})
closeModal()
}
  //delete a reply
  const handleDelete = async (replyID)=>{
    fetch(`https://chatbaze.site/publicPost/${postID}/replies/${replyID}`,{
        method:'DELETE',
        headers : {
            'authorization' : JSON.stringify(userdata),
        }})

  }

  const popupVariants = {
    hidden: {
      opacity:0,
    },
    visible: {
    opacity:1,   
    },
    exit: {
      opacity:0,
    }
}


  const reply =
    !isLoading &&
    <motion.div className='replyContainer'
      variants={popupVariants}
      initial= "hidden"
      animate= "visible"
      exit="exit"
    >
        
        <section key={data._id} className='postreply'>
          <button className='close' onClick={closeModal}>X</button>

          <h1>REPLIES</h1>
          <div className="head">
          <img src={`https://chatbaze.site/${data.profileUrl}`} alt="" className='replyprofile'/>
            <p className="senderID">{data?.sender}</p>
            <p className="senderID">
              {data.sendTime}
            </p>
          </div>

          {isLoading && <h4>loading...</h4>}
          <div id='content'> {data.content} </div>
          <div className='replyFileContainer'>
            {
              data.imageUrl && post.imageUrl !== "undefined" &&
              <img className='replyFile' src={`https://chatbaze.site/${data.imageUrl}`} alt="" />
            }
          </div>

          <div className="postIcons">

            <div className="postIcon" onClick={
              () => handleLikeClick(data._id)
            }>
              <svg className='postsvg postsvg_like' width="24" height="24"
                style={{ fill: data.liked && 'red' }}

                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" color="#000"><path fillRule="evenodd" d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"></path></svg>
              <p className='iconCount'>{data.likes}</p>
            </div>

            <div className="postIcon">
              <svg className='postsvg postsvg_replies' width="32px" height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" color="#000000"><path fillRule="evenodd" d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"></path></svg>
              <div className='iconCount'>{data?.replies?.length}</div>
            </div>

            {userdata.userID === data.senderID &&
              <div className="postIcon">
              <svg onClick={()=>handlePostDelete(postID)}
              className='postsvg postsvg_delete' width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path></svg> 
              </div>
            }


          </div>
        </section>

        <div className="replies">

          <div className="replyInput">
            <input id='replyInput' type="text" placeholder='Type your reply ...'
              value={post} onChange={e => setPost(e.target.value)} />
            <button className='replyInputBtn' onClick={handleClick}>Reply</button>
          </div>

          <div id="replies">
            {data?.replies?.map(reply =>
              <div className="reply" key={reply._id}>
                <div className="head-replies">

                  <div className="senderID" id='sender'>{reply.senderName}</div>
                  <div className="senderID" id='sender'>
                    {reply.sendTime}
                  </div>

                </div>

                <div className='replycontent'>
                  <div>{reply.content}</div>

                  {userdata.userID === reply.sender &&
                  <div className="postIcon">
                    <svg onClick={()=>handleDelete(reply._id)}
                    className='postsvg postsvg_delete' width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path></svg> 
                  </div>
                  }

                </div>
              </div>
            )}
          </div>

        </div>
     </motion.div>
    // </AnimatePresence>

  return reactdom.createPortal(reply, document.querySelector('#reply'))
}

export default Replies
