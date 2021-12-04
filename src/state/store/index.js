import {createStore, combineReducers} from 'redux'
import {} from 'react-redux'
import {userReducer} from './userReducer/userReducer'



export const store = createStore(combineReducers({user: userReducer}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())