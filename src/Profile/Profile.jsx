import React, {useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Homepage'
import ImgUpload from '../Shared/ImgUpload'
import './profile.css'


function Profile() {
    const navigate = useNavigate()
    const {userdata} = useContext(AuthContext)
    const userID = userdata.userID
    const token = userdata.token
    const [user, setUser] = useState({})
    const [bio, setBio] = useState('')
    const [username, setUsername] = useState('')
    const [image, setImage] = useState()


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

            if(username === user.username && bio === user.bio && image){
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

        const handleProfile = async (e) => {
            e.preventDefault()
            if(!image) console.log('nothing changed!');
            else{
                const formdata = new FormData()
                formdata.append('image',image)
                try {
                    await fetch(`http://localhost:3001/profilepic/${userID}/update`,{
                        method: 'POST',
                        headers : {
                            'authorization' : JSON.stringify(userdata),
                        },
                        body:formdata,
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
                        Update Profile
                    </button>
                </div>
                <div className="bottomContainer2">
                    Username : <input className='edit' type="text" placeholder={user.username}
                    onChange={e => setUsername(e.target.value)} />
                    Bio : <input className='edit' type="text" placeholder={user.bio? user.bio : ''}
                    onChange={e => setBio(e.target.value)} />

                    <h3>Update profile picture</h3>
                    <div className="profileUpdate">
                        <ImgUpload childImage={setImage}/>
                        <button id="tweetBtn"
                        onClick={handleProfile}
                        >UPDATE</button>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}

export default Profile
