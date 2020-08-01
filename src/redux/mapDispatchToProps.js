import { bindActionCreators } from 'redux';
import * as actionCreator from './actionCreator';

function mapDispatchToProps(component) {
    switch (component) {
        case "HistoryQuiz": return function (dispatch) {
            return {};
        };
        case "CreateQuiz": return function (dispatch) {
            return {};
        };

        case "MenuQuiz":return function (dispatch){
            return {};
        }
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