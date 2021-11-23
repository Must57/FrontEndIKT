import {createStore, combineReducers} from 'redux'
import {} from 'react-redux'
import {userReducer} from './userReducer/userReducer'



export const store = createStore(combineReducers({user: userReducer}))