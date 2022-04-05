import React, { useState, useContext, Fragment} from 'react'
import { useNavigate } from 'react-router-dom'
import './tweets.css'
import { AuthContext } from '../Homepage'
import { useQuery, useInfiniteQuery } from 'react-query'


function Tweets() {
    const {userdata} = useContext(AuthContext)
    const [liked, setLiked] = useState(false)
    const navigate = useNavigate()

    const fetchTweets = async ({pageParam = 1}) => {
        return fetch(`http://localhost:3001/publicposts?limit=20&page=${pageParam}`,{
            headers : {
                'authorization' : localStorage.getItem('userData')
            }})
            .then(res =>{
                if(!res.ok){throw new Error(res.message)}
                else{
                    return res.json()}
                }) 
    }

    const {isLoading, data, isError, error,
         hasNextPage, fetchNextPage, isFetching, isFetchingNextPage
        } = useInfiniteQuery(
        'tweets',
        fetchTweets, 
        // {
        // staleTime: 30000,
        // },
        {
            getNextPageParam: (lastPage, pages) => {
                if(pages.length < 3){
                    return pages.length + 1
                }else{
                    return undefined
                }
            }
        }
    )

    function handleLikeClick (id) {
        fetch('http://localhost:3001/likePost', {
            headers:{
                'content-type': 'application/json',
                'authorization': userdata.token
            },
            body:
             JSON.stringify({senderID:userdata.userID, postID: id}) ,
            method: 'POST',
        })
        .then( res => res.json())
        .then(parsed => console.log(parsed))
        .then( setLiked(!liked))
    }

    return (
        <>
        {isLoading && 
            <svg width="32px" height="32px" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" color="#000000"><g fill="none" fillRule="evenodd" strokeWidth="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle></g></svg>
        }

        {isError && <h2>{error.message}</h2>}

        {/* {console.log(posts)} */}

        {!isLoading && data !==[] && data &&
            data.pages.map((group , i) =>{
               return   (
        <React.Fragment key={i}>
                    <h3 style={{'color':'blue'}}>---page {i+1}---</h3>
                    {/* {console.log(group)}   */}
                    {group.map(post =>
        <section key={post._id} className='post'>
            
            <p className="senderID">{post.sender}</p>

            <div onClick={() => {navigate(`/replies/${post._id}`)}}>
            <div> {post.content} </div>
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
                    <p className='iconCount'>999</p>
                </div>

                <div className="postIcon">
                    <svg className='postsvg postsvg_replies' width="32px" height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" color="#000000"><path fillRule="evenodd" d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"></path></svg>
                    <div className='iconCount'>999</div>
                </div>
    
            </div>
            
        </section>
        )}                 
        </React.Fragment>)
            }
        )
        }
        
        <button disabled={!hasNextPage} onClick={fetchNextPage}
        >Load more</button>
        <h2>{isFetching && !isFetchingNextPage? 'loading...' : null}</h2>

        {/*verified
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="#000"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
        </>
    )
}

export default Tweets
