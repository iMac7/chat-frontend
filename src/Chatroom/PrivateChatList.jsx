import React from 'react'
import './privateChatList.css'

function PrivateChatList() {
  return (
    <div className='privateChats'>
    <div style={{color:'gray'}}>private messages</div>
    <div className='privateChatList'>
        <div className='chat1'>
            <div className="groupDP"></div>
            <div className="recipientName">ALG</div>
        </div>
    </div>
    <button className='addConversation'>
        NEW CONVERSATION
    </button>
</div>

  )
}

export default PrivateChatList