import React, {useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Homepage'
import './profile.css'


function Profile() {
    const navigate = useNavigate()
    const {userdata} = useContext(AuthContext)
    const userID = userdata.userID
    const token = userdata.token
    const [user, setUser] = useState({})
    const [bio, setBio] = useState('')
    const [username, setUsername] = useState('')

    useEffect(() => {
        try {
                fetch(`http://localhost:3001/profile/${userID}`,{
                    headers : {
                        'authorization' : userdata
                    }
                })
                .then(res => res.json())
                .then(parsed => {
                    console.log(parsed)
                    setUser(parsed)
                })
            }            
        catch (error) {
            console.log(error);
        }
        }, [userID, userdata]) 

        const handleClick = (e) => {
            e.preventDefault()
        }
        
    return (
        <div className='profile'>

            <div className="topContainer">
                <button id='back' onClick={()=> navigate(-1)}>BACK</button>                
            </div>

            <div className="bottomContainer">

                <div className="bottomContainer1">                    
                    <div className="profilePic"></div>
                    <button className='profilebtn'
                    onClick={handleClick}>
                        update profile
                    </button>
                </div>
                <div className="bottomContainer2">
                {/* { user.username?
                    <input type="text" value={'name'}/>:
                    <input type="text" value={' no name'}/>
                }                 */}
                    <input className='edit' type="text" placeholder={user.username}
                    onChange={e => setUsername(e.target.value)} />
                    <input className='edit' type="text" placeholder={user.bio? user.bio : ''}
                    onChange={e => setBio(e.target.value)} />

                </div>
            </div>
        </div>
    )
}

export default Profile
