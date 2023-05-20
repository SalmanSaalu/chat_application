import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ChatlistReducers,MainChatReducers,OnlineReducers} from './reducers/ChatlistReducers'
import { userLoginReducer ,allUsers } from './reducers/UserReducers'

const reducer=combineReducers({
    chatListRed:ChatlistReducers,
    mainChatRed:MainChatReducers,
    userloginRed:userLoginReducer,
    allUserRed:allUsers,
    OnlineRed:OnlineReducers,
})



const middleware=[thunk]


const userInfoFromStorage=localStorage.getItem('userLogin')?
    JSON.parse(localStorage.getItem('userLogin')):null

const initialState={
    userInfo:{userLogin:userInfoFromStorage}
}


const store=createStore(reducer,initialState
    ,composeWithDevTools(applyMiddleware(...middleware)))


   
export default store