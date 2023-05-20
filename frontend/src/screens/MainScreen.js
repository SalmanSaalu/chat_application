import React,{useState,useEffect} from 'react'
import Form from "react-bootstrap/Form";
import {login,allcustomers  } from '../actions/UserActions'
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'
import { Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'

function MainScreen() {
    const [loginpage,setLoginpage]=useState(true)
    const [allpeople,setAllpeople]=useState(true)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const dispatch=useDispatch()
    const  userloginRed=useSelector(state=>state.userloginRed)
    const {error,loading,userLogin}=userloginRed

    const allUserRed=useSelector(state=>state.allUserRed)
    const {alluser}=allUserRed

    function handleSubmit(event) {
      event.preventDefault();
      dispatch(login(username,password))
    
      dispatch(allcustomers())
    }

    useEffect(()=>{
        if(userLogin){
           
            setLoginpage(false)
            
        }

        if(alluser){
            setAllpeople(false)
        }
    },[userLogin,alluser])

  return (
    <div>

        {loginpage == false &&
        <div>   <p>{userLogin['username']}</p>
         <label for="users">Choose a user for chat</label><br/><br/>
        </div>    }

        {allpeople ==false&& <Row>
                    {alluser.map(user=>(
                        <Col key={user.id} sm={12} >
                          <Link to={`/chat/${user.id}`}> <p>{user.username}</p></Link>
                        </Col>
                    ))}
                    </Row>}
     
        
      {loginpage && 
      <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        
        <Button  block="true" size="lg" type="submit" className='mt-3'>
          Login
        </Button>
      </Form>
    </div>}

    </div>
  )
}


export default MainScreen
