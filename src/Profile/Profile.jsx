import React from 'react'
import './profile.css'

function Profile() {
    return (
        <div className='profile'>
            <div className="topContainer">
                <div>back</div>
                <div>Mash</div>
            </div>
            <div className="bottomContainer">
                <div className="bottomContainer1">
                    <div className="profilePic"></div>
                    <button className='profilebtn'>edit profile</button>
                </div>
                <div className="bottomContainer2">
                    <p>name</p>
                    <p>@name</p>
                    <p>description</p>
                    <p>joined</p>
                    <h2>posts</h2>
                </div>
            </div>
        </div>
    )
}

export default Profile
