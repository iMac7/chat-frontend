import React, { useState } from 'react'
import reactdom from 'react-dom'
import TweetArea from '../Home/TweetArea'
import './tweetInputPopup.css'
import {motion, AnimatePresence} from 'framer-motion'


function TweetInputPopup({open, closeModal}) {
    const popupVariants = {
        hidden: {
            y:'-100vh',
        },
        visible: {
            y: 0,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
        exit: {
            y:'100vh',
            // opacity:0,
        },
    }


    const tweetarea = open &&

    <AnimatePresence
    exitBeforeEnter={true} 
    >
        <motion.div className='tweetInputPopupContainer'
        key="TweetInputPopup"
        variants={popupVariants}
        initial= 'hidden'
        animate= 'visible'
        exit='exit'
        >
            <div className="tweetInputPopup">
                <button className='close' onClick={closeModal}>X</button>       
                <TweetArea/>
            </div>
        </motion.div>

    </AnimatePresence>
    return reactdom.createPortal(tweetarea, document.querySelector('#input'))
}

export default TweetInputPopup