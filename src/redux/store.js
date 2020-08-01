import { createStore} from "redux";
import reducer from "./reducer"
//const mainReducer = combineReducers(reducer);

const initialState = {
    username: '',
    password: '',
    token: ''
}

const store = createStore(reducer, initialState);

export default store;