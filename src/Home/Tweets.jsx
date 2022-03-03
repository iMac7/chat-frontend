import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './tweets.css'

function Tweets() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        try {
            fetch("http://localhost:3001/publicposts",{
                headers : {
                    'authorization' : localStorage.getItem('userData')
                }
            }
            )
            .then(res =>{
                if(!res.ok){throw new Error(res.message)}
                else{
                    return res.json()}
                })
            .then(data =>{
                console.log(data);

                if(data === '/login'){
                    navigate('/signin')
                }else{
                    setPosts(data)                    
                }
            })    
            
            setIsLoading(false)
            
        } catch (error) {
            console.log(error);
        }
        }, [navigate]) 

    const handleLikeClick = (e) => {
        e.preventDefault()

        fetch('http://localhost:3001/likePost', {
            headers:{
                'content-type': 'application/json'
            },
            method: 'POST',
        })
        .then( res => res.json())
        .then(parsed => console.log(parsed))
    }


    return (
        <>
        {/* <svg className='loader' data-src="https://s2.svgbox.net/loaders.svg?ic=three-dots" width="32" height="32" color="#000000"></svg> */}

        { 
            !isLoading &&
            posts !==[] &&
            posts.map(post =>
                <section key={post._id} className='post'>
                    <p className="senderID">{post.senderID}</p>
                    <div> {post.content} </div>
                    {
                       post.imageUrl && post.imageUrl !== "undefined" &&
                       <img className='tweetFile' src={`http://localhost:3001/${post.imageUrl}`} alt="" />
                    }

                    <div className="postIcons">

                        <div className="postIcon" onClick={handleLikeClick}>
                            <svg className='postsvg postsvg_like' width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" color="#000"><path fillRule="evenodd" d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"></path></svg>
                            <p className='iconCount'>999</p>
                        </div>

                        <div className="postIcon">
                            <svg className='postsvg postsvg_replies' width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path></svg>
                            <div className='iconCount'>999</div>
                        </div>
            
                    </div>

                </section>
             )
        }

        </>
    )
}

export default Tweets
