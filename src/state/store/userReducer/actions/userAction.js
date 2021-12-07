import { ADD_FAVOURITES, CHANGE_INFORMATION_USER, LOGGED, REMOVE_FAVOURITE } from "../userReducer"

export const loginUser = (data) =>( {type:LOGGED,payload:data.payload})

export const updateInformationUser = (user) => ({type: CHANGE_INFORMATION_USER, payload: {...user}})
export const addFavourites = (data) => ({type:ADD_FAVOURITES, payload:data})
export const removeFavourites = (data) => ({type: REMOVE_FAVOURITE, payload:data})