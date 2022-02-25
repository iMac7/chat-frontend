import React from 'react'
import './chatroom.css'
import ActiveChannel from './ActiveChannel'
import GroupChatList from './GroupChatList'
import SearchChannel from './SearchChannel'
import PrivateChatList from './PrivateChatList'


function Chatroom() {
    return (
        <div className='chatroom'>
           <div className="leftChatNav">
               icons
           </div>

           <div className="rightChatNav">
               <div className="chatroom-dp dp"></div>
               {/* <img src="aightimmaheadout.svg" alt="" /> */}
               <p>CHATROOM</p>
               <SearchChannel className='searchChannel'/>
               <GroupChatList className='groupChats'/>
               <PrivateChatList/>
           </div>

           < ActiveChannel className="activeChannel"/>
        </div>
    )
}

export default Chatroom
