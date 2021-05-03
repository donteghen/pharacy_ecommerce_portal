import { GET_USER, LOGIN_USER, LOGOUT_USER} from "../actions/types";

export const authReducer = (state=null, action) => {
    switch(action.type){
        case GET_USER :
            return action.payload ? action.payload : false
        case LOGIN_USER:
            return action.payload ? action.payload : false
        case LOGOUT_USER:
            return false
        default :
            return state    
    }
}