 import { CHATLIST_REQUEST,
    CHATLIST_FAIL,
    CHATLIST_SUCCESS,
MAINCHAT_FAIL,
MAINCHAT_REQUEST,
MAINCHAT_SUCCESS,

ONLINE_FAIL,
ONLINE_REQUEST,
ONLINE_SUCCESS} from '../constants/ChatlistConstants'
 export const ChatlistReducers =(state ={allchatlist: []},action)=>{
    switch(action.type){
        case CHATLIST_REQUEST:
            return {loading:true,allchatlist:[]}

        case CHATLIST_SUCCESS:
            return {loading:false,allchatlist:action.payload}

        case CHATLIST_FAIL:
            return {loading:false,error:action.payload}

        default:
            return state
    }
}

export const MainChatReducers =(state ={allmainchat: []},action)=>{
    switch(action.type){
        case MAINCHAT_REQUEST:
            return {loading:true,...state}

        case MAINCHAT_SUCCESS:
            return {loading:false,allmainchat:action.payload}

        case MAINCHAT_FAIL:
            return {loading:false,error:action.payload}

        default:
            return state
    }
}


export const OnlineReducers =(state ={onlineUsers: []},action)=>{
    switch(action.type){
        case ONLINE_REQUEST:
            return {loading:true,...state}

        case ONLINE_SUCCESS:
            return {loading:false,onlineUsers:action.payload}

        case ONLINE_FAIL:
            return {loading:false,error:action.payload}

        default:
            return state
    }
}