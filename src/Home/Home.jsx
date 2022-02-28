import React, {useContext} from 'react'

import TweetArea from './TweetArea'
import Tweets from './Tweets.jsx'
import StickyHomeNav from './StickyHomeNav'
import './home.css'
import { AuthContext } from '../Homepage'


function Home() {
    const {userdata} = useContext(AuthContext)
    const {userID, token} = userdata


    return (
            <article className='home'>
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
            </article>
    )
}

export default Home
