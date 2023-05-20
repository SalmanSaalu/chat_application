import { USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT } from '../constants/userConstants'
    import axios from 'axios'


export const login=(username,password)=>async (dispatch)=>{
    try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })

        const config={
            headers:{
                'Content-type':'application/json'
            }
        }

        const {data}=await axios.post(
            '/api/login/',
            {'username':username,'password':password},
            config
            )

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userLogin',JSON.stringify(data))
    }catch(error){
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message})
    }
}



export const allcustomers=()=>async (dispatch)=>{
    try{
        
        dispatch({
            type:'ALL_USER_REQUEST'
        })

        const config={
            headers:{
                'Content-type':'application/json'
            }
        }

        const {data}=await axios.get(
            '/api/allusers/',
            config
            )

        dispatch({
            type:'ALL_USER_SUCCESS',
            payload:data
        })

       
    }catch(error){

    }}