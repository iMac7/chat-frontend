import React, {useState, createContext} from 'react'
import TweetArea from './TweetArea'
import Tweets from './Tweets'
import StickyHomeNav from './StickyHomeNav'
import './home.css'
export const colorContext = React.createContext()

function Home() {
    const [color, setColor] = useState('red')

    return (
        <colorContext.Provider value={color}>
            <article id='home'>
                <div className="topNav">
                    <StickyHomeNav/>
                    <TweetArea/>
                </div>
                <div className='bottomNav'>
                    <br />
                    <Tweets/>
                    <button style={{backgroundColor:color}}
                    onClick={()=>{color === 'red'?
                    setColor('blue') : setColor('red')}}
                    >color</button>
                </div>
            </article>
        </colorContext.Provider>
    )
}

export default Home
