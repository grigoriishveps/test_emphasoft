function mapStateToProps(component) {
    function createAuthHeader(state){
        //return {headers:{"Authorization": "Basic " + btoa(state.email + ':'+state.password)}};
        return {headers:{"Authorization": "Token " + state.token}};
    }
    switch (component) {

        case "HistoryQuiz": {
            return function (state) {
                return {
                    token: state.token,
                    authHeader: createAuthHeader(state)
                };
            }
        }
        case "NewUserComponent": {
            return function (state) {
                return {
                    token: state.token,
                    authHeader: createAuthHeader(state)
                };
            }
        }
        case "EditComponent": {
            return function (state) {
                return {
                    token: state.token,
                    authHeader: createAuthHeader(state)
                };
            }
        }
        case "ContentPage": {
            return function (state) {
                return {
                    authHeader: createAuthHeader(state),
                    token: state.token,
                    isLogin: state.email!==''
                };
            }
        }

        case "AuthComponent": {
            return function (state) {
                return {
                    authHeader: createAuthHeader(state),
                    isLogin: state.token!==''
                };
            }
        }
        case "App": {
            return function(state){
                return{
                    username: state.username
                }
            }
        }
        default: return undefined;
    }
}

export default mapStateToProps;