import React, {useState} from 'react'
import axios from 'axios'
import mapStateToProps from './redux/mapStateToProps'
import mapDispatchToProps from './redux/mapDispatchToProps'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

function AuthComponent(props){

    const [username,setUsername] = useState('test_super');
    const [password,setPassword] = useState('Nf<U4f<rDbtDxAPn');

    const handleChangeEmail = (event) =>{
        const value = event.target.value;
        setUsername(value);
    }
    const handleChangePassword = (event) =>{
        const value = event.target.value;
        setPassword(value);
    }
    const handleClickLogin = ()=>{
        axios.post("http://emphasoft-test-assignment.herokuapp.com/api-token-auth/", {username, password}).then(
            (response)=>{
                console.log(response);
                props.actionLogin({username, password, ...response.data});
            }
        );
    }

    if (props.isLogin)
        return (<Redirect to='/users' />);
    return(
        <div className="authComponent">
                <input type="text" placeholder="username" value={username} onChange={handleChangeEmail}/>
                <input type="text" placeholder="password" value={password} onChange={handleChangePassword}/>
            <button onClick={handleClickLogin}>Войти</button>
        </div>
    )
}

export default connect(mapStateToProps('AuthComponent'),mapDispatchToProps('AuthComponent'))(AuthComponent);