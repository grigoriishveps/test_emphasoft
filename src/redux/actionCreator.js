import * as actions from "./action"

export function actionLogin(value) {
    return {
        type: actions.LOGIN,
        ...value
    };
}

export function actionLogout(value) {
    return {
        type: actions.LOGOUT
    };
}