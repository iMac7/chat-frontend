import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './sidenav.css'

function Sidenav() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const togglenav = () => {
        if(isOpen) setIsOpen(false)
        if(!isOpen) setIsOpen(true)
    }

    return (
        <>
        <nav className={`sideNav ${isOpen && 'sideNav-open'}`}>
                    
            <div className="navItem homeNavItem" 
            onClick={() => {navigate('/')}}>
                <svg width="24" height="24" className='navIcon'                
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000"><path fillRule="evenodd" d="M11.03 2.59a1.5 1.5 0 011.94 0l7.5 6.363a1.5 1.5 0 01.53 1.144V19.5a1.5 1.5 0 01-1.5 1.5h-5.75a.75.75 0 01-.75-.75V14h-2v6.25a.75.75 0 01-.75.75H4.5A1.5 1.5 0 013 19.5v-9.403c0-.44.194-.859.53-1.144l7.5-6.363zM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v6.25h5v-9.403L12 3.734z"></path></svg>
                <h3 className="navLabel">Home</h3>
            </div>

            <div className="navItem" onClick={()=>{navigate('/profile')}}>

                <svg width="32px" height="32px" className='navIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000000"><path fillRule="evenodd" d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z"></path></svg>                <h3 className="navLabel">Profile</h3>

            </div>

            <div className="navItem" onClick={()=>{navigate('/chatroom')}}>
                <svg width="32px" height="32px" className='navIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000000"><path fillRule="evenodd" d="M1.75 3A1.75 1.75 0 000 4.75v14c0 .966.784 1.75 1.75 1.75h20.5A1.75 1.75 0 0024 18.75v-14A1.75 1.75 0 0022.25 3H1.75zM1.5 4.75a.25.25 0 01.25-.25h20.5a.25.25 0 01.25.25v.852l-10.36 7a.25.25 0 01-.28 0l-10.36-7V4.75zm0 2.662V18.75c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V7.412l-9.52 6.433c-.592.4-1.368.4-1.96 0L1.5 7.412z"></path></svg>                
                <h3 className="navLabel">Messages</h3>
            </div>

        </nav>
        <svg width="32px" height="32px" className='sidenav-toggle-svg'
        onClick={togglenav} style={{transform: isOpen && 'rotate(540deg)'}}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000000"><path fillRule="evenodd" d="M13.22 19.03a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 10-1.06 1.06l4.97 4.97H3.75a.75.75 0 000 1.5h14.44l-4.97 4.97a.75.75 0 000 1.06z"></path></svg>

        </>
    )
}

export default Sidenav
