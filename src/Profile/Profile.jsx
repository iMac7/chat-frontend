import React, {useEffect, useState, useContext, useCallback} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import ImgUpload from '../Shared/ImgUpload'
import './profile.css'


function Profile(props) {
    const navigate = useNavigate()

    const {userdata, isLoggedIn} = useContext(AuthContext)
    const userID = userdata?.userID
    const [user, setUser] = useState({})
    const [bio, setBio] = useState('')
    const [username, setUsername] = useState('')
    const [image, setImage] = useState()
    const [profileMessage, setProfileMessage] = useState('')
    const [profilePicMessage, setprofilePicMessage] = useState('')

    const fetchdata = useCallback(
      () => {         
             fetch(`http://chatbaze.site/profile/${userID}`,{
                 headers : {
                     'authorization' : JSON.stringify(userdata)
                 }
             })
             .then(res => res.json())
             .then(user => {
                 setUser(user)
                 props.setProfilePic(user.profileURL)
             })            
    },[userID,userdata,props],)

    
    useEffect(() => {
        if(isLoggedIn===false) navigate('/signIn')
        else{
            try {
                fetchdata()                
            }catch (error) {
                console.log(error);
            }
        }
        }, [userID, userdata,navigate,isLoggedIn,fetchdata]) 

    //update username and bio
    const handleClick = async (e) => {
        e.preventDefault()

        if(username.trim() === '' && bio.trim() === ''){
            setProfileMessage('nothing changed!');                    
            setTimeout(() => {
                setProfileMessage('')
            }, 2000);
            return
        }

        const formdata = new FormData()
        formdata.append('username', username)
        formdata.append('bio', bio)

        if(username === user.username && bio === user.bio){
            setProfileMessage('nothing changed!');                    
            setTimeout(() => {
                setProfileMessage('')
            }, 2000);
        }

        try {
            await fetch(`http://chatbaze.site/profile/${userID}/update`,{
                method: 'POST',
                headers : {
                    'authorization' : JSON.stringify(userdata),
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({username,bio}),
            })
            .then( res => res.json())
            .then(parsed => {
                console.log(parsed)
                if(typeof parsed === 'string'){
                    setProfileMessage(parsed)
                    setTimeout(() => {
                        setProfileMessage('')
                    }, 2000);
                }
            })

            setBio('')
            setUsername('')

            setTimeout(() => {
                fetchdata()                       
            }, 5000);
        }            
        catch (error) {
            console.log(error);
        }           
    }

    //update profile pic
    const handleProfile = async (e) => {
        e.preventDefault()
        if(!image) {
            setprofilePicMessage('no image selected')
            setTimeout(() => {
                setprofilePicMessage('')
            }, 2000);                
        }
        else{
            const formdata = new FormData()
            formdata.append('image',image)
            try {
                await fetch(`http://chatbaze.site/profilepic/${userID}/update`,{
                    method: 'POST',
                    headers : {
                        'authorization' : JSON.stringify(userdata),
                    },
                    body:formdata,
                })
                .then(res => res.json())
                .then(parsed => {
                    console.log(parsed)
                    if(typeof parsed === 'string'){
                        setprofilePicMessage(parsed)
                        setTimeout(() => {
                            setprofilePicMessage('')
                        }, 2000);
                        setImage()
                    }
                })

                setTimeout(() => {
                    fetchdata()                       
                }, 5000)
            }            
            catch (error) {
                console.log(error);
            }
        }

    }
        
    return (
        isLoggedIn &&
        <div className='profile'>

            <div className="topContainer">
                <button id='back' onClick={()=> navigate(-1)}>BACK</button>                
            </div>

            <div className="bottomContainer">

                <div className="bottomContainer1">                    
                    {user.profileURL && <img src={`http://chatbaze.site/${user.profileURL}`} alt="" className="profilePic"/>}
                    <button className='profilebtn'
                    onClick={handleClick}>
                        <strong>Update Profile</strong>
                    </button>
                </div>

                <div className="bottomContainer2">
                    Username : <input className='edit' type="text" placeholder={user.username}
                    onChange={e => setUsername(e.target.value)} />
                    Bio : <input className='edit' type="text" placeholder={user.bio? user.bio : ''}
                    onChange={e => setBio(e.target.value)} />
                    <p style={{color:'blue'}}>{profileMessage}</p>

                    <h3>Update profile picture</h3>
                    <div className="profileUpdate">
                        <ImgUpload childImage={setImage}/>
                        <button id="tweetBtn"
                        onClick={handleProfile}
                        >UPDATE</button>
                    </div>
                    
                </div>
                    <p style={{color:'blue'}}>{profilePicMessage}</p>

            </div>
        </div>
    )
}


export default Profile
