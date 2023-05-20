import { USER_LOGIN_FAIL,
USER_LOGIN_REQUEST,
USER_LOGIN_SUCCESS,
USER_LOGOUT } from '../constants/userConstants'


export const userLoginReducer =(state ={},action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true}

        case USER_LOGIN_SUCCESS:
            return {loading:false,userLogin:action.payload}

        case USER_LOGIN_FAIL:
            return {loading:false,error:action.payload}

        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const allUsers=(state ={},action)=>{
    switch(action.type){
        case 'ALL_USER_REQUEST':
            return {loading:true}

        case 'ALL_USER_SUCCESS':
            return {loading:false,alluser:action.payload}

        default:
            return state
    }
}