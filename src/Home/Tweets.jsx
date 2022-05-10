import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './tweets.css'
import { AuthContext } from '../App'
import { useQuery, useInfiniteQuery } from 'react-query'
import Replies from '../Replies/Replies'


function Tweets() {
    const {userdata} = useContext(AuthContext)
    const [liked, setLiked] = useState(false)
    const [open, setOpen] = useState(false)
    const [repliesIsOpen, setRepliesIsOpen] = useState(false)
    const [postID, setPostID] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    
    
    const fetchTweets = async ({pageParam = 1}) => {
        return fetch(`http://localhost:3001/publicposts?limit=10&page=${pageParam}`,{
            headers : {
                'authorization' : JSON.stringify(userdata)
            }})
            .then(res =>{
                if(!res.ok){throw new Error(res.message)}
                else{
                    return res.json()}
                }) 
    }

    const {isLoading, data, isError, error,
         hasNextPage, fetchNextPage, isFetching, isFetchingNextPage,
         hasPreviousPage, fetchPreviousPage, isFetchingPreviousPage
        } = useInfiniteQuery(
            'tweets',
        fetchTweets, 
        {
            getNextPageParam: (lastPage, pages) => {
<<<<<<< HEAD
                if(lastPage.length<10) return
                else{return pages.length + 1}
            },
            refetchOnWindowFocus: false,
            refetchInterval: 10000,
            cacheTime: 1000*60*2,            
=======
                // if(pages.length < 3){
                //     return pages.length + 1
                // }else{
                //     return undefined
                // }
                return pages.length + 1
            },
            refetchOnWindowFocus: false,
            refetchInterval: 10000,
            
>>>>>>> 0ab5e20ed5d3b684ce277a9253046c44230abe0d
        }
        )

    //delete button
    const handleDelete = async (id)=>{
        fetch(`http://localhost:3001/publicPost/${id}/delete`,{
            method:'DELETE',
            headers : {
                'authorization' : JSON.stringify(userdata),
            }})
    }
        
// intersection observer
        const observer = useRef(
            new IntersectionObserver((entries) => {
                const first = entries[0]
                // console.log(first)
                if(first.isIntersecting) {
                    fetchNextPage()
                }
            }, {threshold: 1 })
        )
        const [element, setElement] = useState(null)
    
        useEffect(() => {
          const currentElement = element
          const currentObserver = observer.current
    
          if (currentElement) {
              currentObserver.observe(currentElement)
          }          
          return () => {
           if (currentElement) {
               currentObserver.unobserve(currentElement)
           }
          }
        }, [element])

    //like button functionality
    async function handleLikeClick (id) {
        await fetch('http://localhost:3001/likePost', {
            headers:{
                'content-type': 'application/json',
                'authorization': JSON.stringify(userdata)
            },
            body:
             JSON.stringify({senderID:userdata.userID, postID: id}) ,
            method: 'POST',
        })
        .then( res => res.json())
        .then(parsed => {
            console.log(parsed)
            if(typeof parsed === 'string'){
                setMessage(parsed)
                setTimeout(() => {
                    setMessage('')
                }, 2000);
            }

        })
        
    }

    return (
        <>
        {isLoading && 
            <svg width="32px" height="32px" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" color="#000000"><g fill="none" fillRule="evenodd" strokeWidth="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle></g></svg>
        }

        {isError && <h2>{error.message}</h2>}

<<<<<<< HEAD
=======
        {/* {console.log(posts)} */}
        
        {/* <button
            onClick={() => fetchPreviousPage()}
            disabled={!hasPreviousPage || isFetchingPreviousPage}
        >
            {isFetchingPreviousPage
            ? 'Loading more...'
            : hasPreviousPage
            ? 'Load Older'
            : 'Nothing more to load'}
        </button> */}

>>>>>>> 0ab5e20ed5d3b684ce277a9253046c44230abe0d
        {!isLoading && data !==[] && data &&
            data.pages.map((group , i) =>{
               return   (
        group !==[] &&          
        <React.Fragment key={i}>
            
            {group.map(post =>
            
            <section key={post._id} ref={setElement} className='post'>
                    <div className="head">
                        {post.profileUrl!== null && <img src={`http://localhost:3001/${post.profileUrl}`} className='postProfile' alt='img'/>}
                        <p className="senderID">{post.sender}</p>
                        <p className="senderID time">
                            {post.sendTime}
                        </p>
                    </div>

                    <div onClick={()=>{
                        setRepliesIsOpen(!open)
                        setPostID(post._id)
                        }}>
                    <div id='content'> {post.content} </div>
                    {
                        post.imageUrl && post.imageUrl !== "undefined" &&
                        <img className='tweetFile' src={`http://localhost:3001/${post.imageUrl}`} alt="" />
                    }
                    </div>

                    <div className="postIcons">

                        <div className="postIcon" onClick={
                            () => handleLikeClick(post._id)
                            }>
                            <svg className='postsvg postsvg_like' width="24" height="24"
                            style={{fill: post.liked && 'red'}}
                            
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" color="#000"><path fillRule="evenodd" d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"></path></svg>
                            <p className='iconCount'>{post.likes}</p>
                        </div>
                            {/* <p style={{color:'pink'}}>{message}</p> */}

                        <div className="postIcon">
                            <svg onClick={()=>{
                        setRepliesIsOpen(!open)
                        setPostID(post._id)}}
                         className='postsvg postsvg_replies' width="32px" height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" color="#000000"><path fillRule="evenodd" d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"></path></svg>
                            <div className='iconCount'>{post.replies}</div>
                        </div>
                        
                        {userdata.userID === post.senderID &&
                        <div className="postIcon">
                        <svg onClick={()=>handleDelete(post._id)}
                        className='postsvg postsvg_delete' width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path></svg> 
                        </div>
                        }
            
                    </div>

<<<<<<< HEAD
                </section>
=======
                    <div className="postIcon">
                        <svg className='postsvg postsvg_replies' width="32px" height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" color="#000000"><path fillRule="evenodd" d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"></path></svg>
                        <div className='iconCount'>999</div>
                    </div>
        
                </div>
                
                
            </section>
>>>>>>> 0ab5e20ed5d3b684ce277a9253046c44230abe0d
            )}
                      
        </React.Fragment>
                        )
            }
        )
        }
        
<<<<<<< HEAD
=======
        {/* <button disabled={!hasNextPage || isFetchingNextPage} onClick={fetchNextPage}
        >Load more</button> */}
        {/* {console.log(hasNextPage)} */}
>>>>>>> 0ab5e20ed5d3b684ce277a9253046c44230abe0d
        <h2>{isFetching && !isFetchingNextPage? 'loading...' : null}</h2>

        {/*verified svg
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="#000"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
        
        {repliesIsOpen && <Replies postID={postID} closeModal={()=>setRepliesIsOpen(false)} />}

        </>
    )
}

export default Tweets