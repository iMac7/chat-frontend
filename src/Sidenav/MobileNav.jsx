import './mobileNav.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <>        
        <div className={`mobileNav-toggle ${!isOpen && 'mobileNav-toggle-closed'}`}
            onClick={()=> setIsOpen(!isOpen)}
        >
            <svg id="mobileNav-toggle" width="32px" height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000000"><path fillRule="evenodd" d="M6.47 10.78a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0l5.25 5.25a.75.75 0 11-1.06 1.06L13 6.81v12.44a.75.75 0 01-1.5 0V6.81l-3.97 3.97a.75.75 0 01-1.06 0z"></path></svg>
        </div>                    

        <nav className={`mobileNav ${!isOpen && 'mobileNavOpen'}`}>
            
            <div className="mobileNavItem"
            onClick={() => {navigate('/')}}>
                <svg width="24" height="24" className='mobileNavIcon'
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000"><path fillRule="evenodd" d="M11.03 2.59a1.5 1.5 0 011.94 0l7.5 6.363a1.5 1.5 0 01.53 1.144V19.5a1.5 1.5 0 01-1.5 1.5h-5.75a.75.75 0 01-.75-.75V14h-2v6.25a.75.75 0 01-.75.75H4.5A1.5 1.5 0 013 19.5v-9.403c0-.44.194-.859.53-1.144l7.5-6.363zM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v6.25h5v-9.403L12 3.734z"></path></svg>
            </div>

            <div className="mobileNavItem"
            onClick={() => {navigate('/chatroom')}}>
                <svg viewBox="0 0 24 24" aria-hidden="true" className='mobileNavIcon'><g>
                    <path d="M19.25 3.018H4.75C3.233 3.018 2 4.252 2 5.77v12.495c0 1.518 1.233 2.753 2.75 2.753h14.5c1.517 0 2.75-1.235 2.75-2.753V5.77c0-1.518-1.233-2.752-2.75-2.752zm-14.5 1.5h14.5c.69 0 1.25.56 1.25 1.25v.714l-8.05 5.367c-.273.18-.626.182-.9-.002L3.5 6.482v-.714c0-.69.56-1.25 1.25-1.25zm14.5 14.998H4.75c-.69 0-1.25-.56-1.25-1.25V8.24l7.24 4.83c.383.256.822.384 1.26.384.44 0 .877-.128 1.26-.383l7.24-4.83v10.022c0 .69-.56 1.25-1.25 1.25z"></path></g>
                </svg>
            </div>

            <div className="mobileNavItem"
            onClick={() => {navigate('/profile')}}>
                <svg width="32px" height="32px" className='mobileNavIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000000"><path fillRule="evenodd" d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z"></path></svg>      
            </div>                

        </nav>
        </>
    )
}

export default MobileNav
