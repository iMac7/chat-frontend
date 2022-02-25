import React from 'react'
import './groupChatList.css'

function GroupChatList() {
    return (
        <div className='groupChats'>
            <div style={{color:'gray'}}>groups</div>
            <div className='groupChatList'>
                <div className='group1'>
                    <div className="groupDP"></div>
                    <div className="groupName">ALG</div>
                </div>
            </div>
            <button className='addGroup'>
                ADD GROUP
            </button>
        </div>
    )
}

export default GroupChatList
