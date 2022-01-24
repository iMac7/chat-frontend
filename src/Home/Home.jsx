import React from 'react'
import TweetArea from './TweetArea'
import Tweets from './Tweets'
import StickyHomeNav from './StickyHomeNav'
import './home.css'

function Home() {
    return (
        <article id='home'>
            <StickyHomeNav/>
            <TweetArea/>
            <br />
            <Tweets/>
        </article>
    )
}

export default Home
