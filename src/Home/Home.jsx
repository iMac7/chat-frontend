import React, {useContext, useState} from 'react'

import TweetArea from './TweetArea'
import Tweets from './Tweets.jsx'
import StickyHomeNav from './StickyHomeNav'
import './home.css'
import { AuthContext } from '../Homepage'
import TweetInputPopup from '../Popups/TweetInputPopup'


function Home() {
        
        const {userdata} = useContext(AuthContext)
        const {userID, token} = userdata
        const [isOpen, setIsOpen] = useState(false)


    return (
            <article className='home'>
                <div className="write" onClick={() => isOpen===false? setIsOpen(true) : setIsOpen(false)}>
                    <svg className='writesvg' width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="#000"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-2.207 2.207L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
                </div>
                <div className="topNav">
                    <StickyHomeNav/>
                </div>
                <div className='bottomNav'>
                    <TweetArea/>
                    <br />
                    <Tweets/>
                </div>
                {
                // console.log(`token:${token}, uid:${userID}`)
                }
                <TweetInputPopup open={isOpen} closeModal={() => setIsOpen(false)}/>

            </article>
    )
}

export default Home
