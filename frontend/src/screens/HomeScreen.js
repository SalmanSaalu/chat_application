import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import ChatList from '../components/ChatList'
import { Link } from 'react-router-dom'
import { Row,Col } from 'react-bootstrap'
import {allChats,onlinechats  } from '../actions/ChatlistActions'

function HomeScreen() {
//   const [chatllist,setChatlist]=useState([])
const dispatch=useDispatch()
const chatListRed=useSelector(state=>state.chatListRed)
const [list,setList]=useState(false)
const secrettoken=JSON.parse(localStorage.getItem('userLogin'))

const  OnlineRed=useSelector(state=>state.  OnlineRed)
const {onlineUsers}=OnlineRed

const {error,loading,allchatlist}=chatListRed
console.log(allchatlist)
  useEffect(()=>{
    dispatch(allChats())
    setList(true)
  },[list])
  

  return (
    <div>
      <h3>Chatist</h3>
   
    <Row>
      {allchatlist.map(chat=>(
         secrettoken.username === chat.sender_username ?
          <div>
            <Link to={`/chat/${chat.reciever}`}>   
                <p>{chat.reciever_username}</p> 
                <p style={{fontFamily:'cursive'}}>{chat.content}</p>
                {onlineUsers.map((obj)=>
                obj.online_username ===chat.reciever_username ?
                <p style={{fontFamily:'cursive'}}>online</p>
                :"")}
            </Link>
          </div>
         :

         secrettoken.username === chat.reciever_username ?

         <div>
         <Link to={`/chat/${chat.sender}`}>   
             <p>{chat.sender_username}</p> 
             <p style={{fontFamily:'cursive'}}>{chat.content}</p>
             {onlineUsers.map((obj)=>
              obj.online_username ===chat.sender_username ?
             <p style={{fontFamily:'cursive'}}>online</p>
             :"")}
         </Link>
          </div>
          
          :
          <p>no list</p>
         
      ))}
    </Row>
    
    

    </div>
  )
}

export default HomeScreen
