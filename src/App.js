import React from 'react';
import './App.css';
import AuthComponent from "./AuthComponent";
import {BrowserRouter,  Route, Switch} from 'react-router-dom';
import ContentPage from './ContentPage'
import EditComponent from "./EditComponent";
import NewUserComponent from "./NewUserComponent";
function App() {
    return (
        <div className="App">
            <div className="App-main">
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={AuthComponent} />
                        {/*<Route exact path='/users' component={ContentPage} />*/}
                        <Route path='/users'>
                                <Switch>
                                    <Route exact path='/users' component={ContentPage} />
                                    <Route path='/users/new' component={NewUserComponent} />
                                    <Route path='/users/:id' component={EditComponent} />
                                </Switch>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>

        </div>
    );
}

export default App;
