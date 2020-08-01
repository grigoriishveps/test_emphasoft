import React from 'react';
import './App.css';
import './UserInterface.css'
import AuthComponent from "./AuthComponent";
import {BrowserRouter,  Route, Switch, Router, useParams} from 'react-router-dom';
import ContentPage from './ContentPage'
import EditComponent from "./EditComponent";
import NewUserComponent from "./NewUserComponent";
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={AuthComponent} />
                        {/*<Route exact path='/users' component={ContentPage} />*/}
                        <Route path='/users'>
                                <Route exact path='/users' component={ContentPage} />
                                <Switch>
                                <Route path='/users/new' component={NewUserComponent} />
                                <Route path='/users/:id' component={EditComponent} />
                                </Switch>
                                </Route>

                    </Switch>
                </BrowserRouter>
            </header>

        </div>
    );
}

export default App;
