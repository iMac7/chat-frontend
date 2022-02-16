import React, {useState, useContext} from 'react'

import TweetArea from './TweetArea'
import Tweets from './Tweets.jsx'
import StickyHomeNav from './StickyHomeNav'
import './home.css'
import { AuthContext } from '../Homepage'


function Home() {
    const auth = useContext(AuthContext)

    return (
            <article className='home'>
                <div className="topNav">
                    <StickyHomeNav/>
                </div>
                <div className='bottomNav'>
                    <TweetArea/>
                    <br />
                    <Tweets/>
                    {console.log(auth)}
                </div>
            </article>
    )
}

export default Home
