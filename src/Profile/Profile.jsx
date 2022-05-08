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

        const handleClick = async (e) => {
            e.preventDefault()

            const formdata = new FormData()
            formdata.append('username', username)
            formdata.append('bio', bio)

            // console.log(username === user.username, bio === user.bio)

            if(username === user.username && bio === user.bio){
                console.log('nothing changed!');
            }else{
                try {
                    await fetch(`http://localhost:3001/profile/${userID}/update`,{
                        method: 'POST',
                        headers : {
                            'authorization' : userdata,
                            // Accept: 'multipart/form-data',
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify({username,bio}),
                    })
                    // .then( res => res.json())
                    // .then(parsed => console.log(parsed))
                
                }            
                catch (error) {
                    console.log(error);
                }
            }
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
                    Username : <input className='edit' type="text" placeholder={user.username}
                    onChange={e => setUsername(e.target.value)} />
                    Bio : <input className='edit' type="text" placeholder={user.bio? user.bio : ''}
                    onChange={e => setBio(e.target.value)} />

                </div>
            </div>
        </div>
    )
}

export default Profile
