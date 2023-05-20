import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function ChatList({chat}) {

  const secrettoken=JSON.parse(localStorage.getItem('userLogin'))
  // const chatListRed=useSelector(state=>state.chatListRed)
  // const {error,loading,allchatlist}=chatListRed
  return (
    <Card className='my-3 p-3 rounded'>
    {secrettoken.sender_username === chat.sender_username} ?

    <div>
      <Link to={`/chat/${chat.reciever}`}>   
          <p>{chat.reciever_username}</p> 
      </Link>
    </div>
              :
    <div>
      <Link to={`/chat/${chat.sender}`}>   
          <p>{chat.sender_username}</p>
      </Link>
    </div>

    
    </Card>
  )
}

export default ChatList
