

const initialState = {
    isLogged: false,
    username: '',
    firstname:'',
    lastname:'',
    city:'',
    birthday:'',
    token:'',
    numberPhone:'',
    email:'',
    preferences: {
        max_allow_distance: 0,
        climat_choice: []
    },
    favouritesCity: [],
    password:''
}

export const CHANGE_INFORMATION_USER = 'CHANGE_INFORMATION_USER'
export const ADD_FAVOURITES = 'ADD_FAVOURITES'
// we need async here (get new hash)
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'

export const LOGGED = 'LOGGED'

export const DISCONNECT = 'DISCONNECT'

export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE"


export const userReducer = function (state= initialState, action) {

    switch(action.type) {
        case LOGGED:
            return {...state,isLogged: true, token: action.payload }
        case CHANGE_INFORMATION_USER:
            return {...state, ...action.payload}
        case CHANGE_PASSWORD:
            return {...state, password: action.payload}
        case ADD_FAVOURITES:
                return {...state, favouritesCity:[...state.favourites,action.payload]}
        case DISCONNECT:
            return {...state, isLogged: false, token: action.payload }
        case REMOVE_FAVOURITE:
            return {...state, favouritesCity: [...state.favourites.filter((e) => e !== action.payload)]}

        default: return state
    }
}