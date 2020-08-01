import * as actions from "./action"


function reducer(state, action){
    switch (action.type) {
        case actions.LOGIN:{
            return {...state, username:action.username , password:action.password, token: action.token}
        }
        case actions.LOGOUT:{
            return {...state, authHeader:{ username:'',password:''}};
        }
        default:
            return state;
    }
}

export default reducer;