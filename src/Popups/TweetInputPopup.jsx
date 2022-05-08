import React from 'react'
import reactdom from 'react-dom'
import TweetArea from '../Home/TweetArea'
import './tweetInputPopup.css'
import {motion, AnimatePresence} from 'framer-motion'


function TweetInputPopup({open, closeModal}) {
    const popupVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1}
    }

    const tweetarea = open &&

    <AnimatePresence exitBeforeEnter>
        <motion.div className='tweetInputPopupContainer'
        variants={popupVariants}
        initial= "hidden"
        animate= "visible"
        exit="hidden"
        >
        <div className="tweetInputPopup">
            {/* <div onClick={closeModal}>
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="#000"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
            </div> */}
            <button className='close' onClick={closeModal}>X</button>       
            <TweetArea/>
        </div>
        </motion.div>
    </AnimatePresence>
    return reactdom.createPortal(tweetarea, document.querySelector('#input'))
}

export default TweetInputPopup