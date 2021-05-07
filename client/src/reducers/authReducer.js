import { GET_USER, LOGIN_USER, LOGOUT_USER, SIGNUP_USER} from "../actions/types";

export const authReducer = (state=null, action) => {
    switch(action.type){
        case GET_USER :
            return action.payload ? action.payload : null
        case SIGNUP_USER:
            return action.payload ? action.payload : null
        case LOGIN_USER:
            return action.payload ? action.payload : null
        case LOGOUT_USER:
            return null
        default :
            return state    
    }
}