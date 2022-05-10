import React, {useContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import TweetArea from './TweetArea'
import Tweets from './Tweets.jsx'
import StickyHomeNav from './StickyHomeNav'
import './home.css'
import { AuthContext } from '../App'
import TweetInputPopup from '../Popups/TweetInputPopup'

function Home({profilePic}) {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const {isLoggedIn} = useContext(AuthContext)

    useEffect(() => {
        if(isLoggedIn===false) navigate('/signIn')
    }, [navigate,isLoggedIn])
        

    return (
        isLoggedIn && 
        <article className='home'>
            <div className="write" onClick={() => isOpen===false? setIsOpen(true) : setIsOpen(false)}>
                <svg className='writesvg' width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000"><path fillRule="evenodd" d="M17.263 2.177a1.75 1.75 0 012.474 0l2.586 2.586a1.75 1.75 0 010 2.474L19.53 10.03l-.012.013L8.69 20.378a1.75 1.75 0 01-.699.409l-5.523 1.68a.75.75 0 01-.935-.935l1.673-5.5a1.75 1.75 0 01.466-.756L14.476 4.963l2.787-2.786zm-2.275 4.371l-10.28 9.813a.25.25 0 00-.067.108l-1.264 4.154 4.177-1.271a.25.25 0 00.1-.059l10.273-9.806-2.94-2.939zM19 8.44l2.263-2.262a.25.25 0 000-.354l-2.586-2.586a.25.25 0 00-.354 0L16.061 5.5 19 8.44z"></path></svg>
            </div>

            <div className="topNav">
                <StickyHomeNav/>
            </div>

            <div className='bottomNav'>
                <TweetArea/>
                <br />
                <Tweets/>
            </div>

            <TweetInputPopup open={isOpen} closeModal={() => setIsOpen(false)}/>

        </article>
    )
}

export default Home
