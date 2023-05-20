import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { allMainChats,onlinechats } from '../actions/ChatlistActions'
// import useWebSocket  from 'react-use-websocket'


function ChatScreen() {
const [socket, setSocket] = useState(null);

const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);

const [recieveCheck,setRecieveCheck]=useState("")
const [mainchat,setMainchat]=useState(false)


const { id } = useParams();
const dispatch=useDispatch()
const  mainChatRed=useSelector(state=>state. mainChatRed)
const  OnlineRed=useSelector(state=>state.  OnlineRed)
const secrettoken=JSON.parse(localStorage.getItem('userLogin'))

const {loading,error,allmainchat}=mainChatRed
const {onlineUsers}=OnlineRed
useEffect(() => {
  
  dispatch(allMainChats(id))
  dispatch(onlinechats())
  setMainchat(true)   
  if(mainchat){
  const newSocket = new WebSocket("ws://localhost:8000/ws/chatapp/?token="+secrettoken.key);
  setSocket(newSocket);

  newSocket.onopen = () => console.log("WebSocket connected");
  newSocket.onclose = () => console.log("WebSocket disconnected");
  return () => {
    newSocket.close();
  };
}
 
}, [dispatch,mainchat]);

useEffect(() => {
  if (socket) {
   
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(messages)
    };
  }

}, [socket,loading]);






const handleSubmit = (event) => {
  var recieve=''
  event.preventDefault();
  if (message && socket) {

    if(allmainchat[0].sender_username === secrettoken.username ){
      recieve=allmainchat[0].reciever_username
    }
    else{
      recieve=allmainchat[0].sender_username
    }
    setRecieveCheck(recieve)
    const data = {
      message: message,
     sender:secrettoken.username ,
     reciever:recieve
    };
    
    socket.send(JSON.stringify(data));
    setMessage("");
  }
};

return (

  <div className="chat-container">
     {loading===false ? 
    allmainchat[0].sender_username=== secrettoken.username ? <h2>{allmainchat[0].reciever_username}</h2> :<h2>{allmainchat[0].sender_username}</h2>
     :<p>recievername</p>}

      <div>
        {onlineUsers.map(obj=>

          loading===false?
          allmainchat[0].sender_username=== secrettoken.username ? 

          obj.online_username ===allmainchat[0].reciever_username ? 
          <div key={obj.id} >
            <h5 style={{fontFamily:'cursive'}}>online</h5>
            
          </div>:""

          :
          
          obj.online_username ===allmainchat[0].sender_username ? 
          <div key={obj.id} >
            <h5 style={{fontFamily:'cursive'}}>online</h5>
          
          </div>:""

          :""
       )}
      </div>


    <div className="chat-header">Chat</div>
    <div>
        {allmainchat.map((obj) =>
           obj.sender_username === secrettoken.username ? 
            <div key={obj.id} style={{textAlign:'left'}}>
              <h5>{obj.sender_username}</h5>
              <p>{obj.content}</p>
            </div>:
            <div key={obj.id} style={{textAlign:'right'}}>
              <h5>{obj.sender_username}</h5>
              <p>{obj.content}</p>
            </div>
         )}
        </div>

    <div className="message-container">
    {messages.map((message, index) => (
            
            message.sender ===secrettoken.username ? 
              <div key={index} className="message" style={{textAlign:"left"}}>
              <div className="message-username">{message.sender}:</div>
              <div className="message-content">{message.message}</div>
              <div className="message-timestamp">{message.timestamp}</div>
            </div> 
            :
             
             message.reciever ===secrettoken.username && message.sender===(allmainchat[0].sender_username === secrettoken.username ? allmainchat[0].reciever_username:allmainchat[0].sender_username)?
            <div key={index} className="message" style={{textAlign:"right"}}>
            <div className="message-username">{message.sender}:</div>
            <div className="message-content">{message.message}</div>
            <div className="message-timestamp">{message.timestamp}</div>
            </div>

          :""
          ))}
    </div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  </div>
);
}
export default ChatScreen
