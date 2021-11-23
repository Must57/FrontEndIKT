import { CHANGE_INFORMATION_USER, LOGGED } from "../userReducer"

export const loginUser = (data) =>( {type:LOGGED,payload:data.payload})

export const updateInformationUser = (user) => ({type: CHANGE_INFORMATION_USER, payload: {...user}})