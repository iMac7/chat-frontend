import React, {useContext} from 'react'

import TweetArea from './TweetArea'
import Tweets from './Tweets.jsx'
import StickyHomeNav from './StickyHomeNav'
import './home.css'

function Home() {

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
            </article>
    )
}

export default Home
