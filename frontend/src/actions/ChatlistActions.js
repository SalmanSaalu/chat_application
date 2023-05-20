import { CHATLIST_REQUEST,
    CHATLIST_FAIL,
    CHATLIST_SUCCESS,
MAINCHAT_FAIL,
MAINCHAT_REQUEST,
MAINCHAT_SUCCESS,
ONLINE_FAIL,
ONLINE_REQUEST,
ONLINE_SUCCESS } from '../constants/ChatlistConstants'
import axios from 'axios'

export const allChats=()=>async (dispatch) =>{
 try{
    const userLogin=JSON.parse(localStorage.getItem('userLogin'))
     

    const config={
        headers:{
            'Content-type':'application/json',
            Authorization:`Token ${userLogin.key}`
        }
    }

    dispatch({type:CHATLIST_REQUEST})
    const {data}=await axios.get('/api/chatlist/',config)
    dispatch({
        type:CHATLIST_SUCCESS,
        payload:data
    })

 }catch(error){
    dispatch({
        type:CHATLIST_FAIL,
        payload:error.response && error.response.data.detail
    ? error.response.data.detail
    : error.message})
 }
}

export const allMainChats=(id)=>async (dispatch,getState) =>{
    try{
       dispatch({type:MAINCHAT_REQUEST})
       const userLogin=JSON.parse(localStorage.getItem('userLogin'))
     

       const config={
           headers:{
               'Content-type':'application/json',
               Authorization:`Token ${userLogin.key}`
           }
       }

      
       const {data}=await axios.get(`/api/mainchat/${id}`,config)
    // const {data}=await axios.get('/api/messages/')  
    dispatch({
           type:MAINCHAT_SUCCESS,
           payload:data
       })
   
    }catch(error){
       dispatch({
           type:MAINCHAT_FAIL,
           payload:error.response && error.response.data.detail
       ? error.response.data.detail
       : error.message})
    }
   }


   export const onlinechats=()=>async (dispatch) =>{
    try{
       dispatch({type:ONLINE_REQUEST})
       const userLogin=JSON.parse(localStorage.getItem('userLogin'))
     

       const config={
           headers:{
               'Content-type':'application/json',
               Authorization:`Token ${userLogin.key}`
           }
       }

      
       const {data}=await axios.get(`/api/onlineuser/`,config)
    // const {data}=await axios.get('/api/messages/')  
    dispatch({
           type:ONLINE_SUCCESS,
           payload:data
       })
   
    }catch(error){
       dispatch({
           type:ONLINE_FAIL,
           payload:error.response && error.response.data.detail
       ? error.response.data.detail
       : error.message})
    }
   }