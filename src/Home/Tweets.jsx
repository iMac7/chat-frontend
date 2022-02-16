import React, {useEffect, useState} from 'react'
import './tweets.css'

function Tweets() {
    const [posts, setPosts] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            fetch("http://localhost:3001/publicposts")
            .then(res =>{
                if(!res.ok){throw new Error(res.message)}
                else{return res.json()}
                })
            .then(data =>{setPosts(data)})    
            
            setIsLoading(false)
            

        } catch (error) {
            console.log(error);
        }
        }, []) 

    return (
        <>
        { 
            !isLoading&&
            posts&&
            posts.map(post => <div key={post._id}>{post.content}</div> )      
        }
        </>
    )
}

export default Tweets
