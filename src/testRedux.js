import {createStore, combineReducers} from 'redux'

const initialState = 0
const initialStateTest = {name:'Hamdullah'}
function incrementReducer(state = initialState, action) {
    if (action.type === 'INCREMENT') {
        return state + 1
    }
    if (action.type === 'DECREMENT') {
        return state - 1
    }
    return state
}
function testReducer(state = initialStateTest , action) {
    if (action.type==='CHANGE_NAME') {
        return {...state, name:action.payload}
    }
    return state
}


const store = createStore(combineReducers({incrementState: incrementReducer, test:testReducer}))

store.subscribe(() => {
    console.log(store.getState())
})


store.dispatch({type: 'INCREMENT'})
store.dispatch({type:'DECREMENT'})

store.dispatch({type: 'CHANGE_NAME', payload:'Parukanettin'})