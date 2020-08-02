import { bindActionCreators } from 'redux';
import * as actionCreator from './actionCreator';

function mapDispatchToProps(component) {
    switch (component) {
        case "ContentPage":return function (dispatch){
            return {};
        }
        case "AuthComponent":return function (dispatch){
            return {
                actionLogin: bindActionCreators(actionCreator.actionLogin, dispatch)
            };
        }
        case "App": return function (dispatch) {
            return {};
        }
        default: return undefined;
    }
}

export default mapDispatchToProps;