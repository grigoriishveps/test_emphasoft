import React, {useState} from 'react'
import axios from 'axios'
import mapStateToProps from './redux/mapStateToProps'
import mapDispatchToProps from './redux/mapDispatchToProps'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

function AuthComponent(props){

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [userErr, setUserErr] = useState('');
    const [passErr, setPassErr] = useState('');

    const [sendErr, setSendErr] = useState("");

    let handleChangeField = (field, event) => {
        const value = event.target.value;
        let err = ''
        switch (field) {
            case "username":
                setUsername(value);
                err = (!value.match(/^[\w\d._+@]*$/)) ? "Только буквы, цифры и (+_-.@" : "";
                err += (value.length > 150) ? "Не более 150 символов" : "";
                err += (value.length < 1) ? "Не пусто" : "";
                setUserErr(err);
                break;
            case "password":
                setPassword(value);
                err = (!value.match(/^(?=.*[A-Z])(?=.*\d).*$/)) ? "Хотя бы 1 символ прописной и цифры. " : "";
                err += (value.length > 128) ? "Не более 128 символов" : "";
                err += (value.length < 9) ? "Введите больше 8 символов" : "";
                setPassErr(err);
                break;
        }
    }
    const handleClickLogin = ()=>{

        if(userErr ==="" && passErr==="" ) {
            if(username ==="" || password==="")
                setSendErr("Не все поля заполнены!");
            else
                axios.post("http://emphasoft-test-assignment.herokuapp.com/api-token-auth/", {username, password}).then(
                    (response) => {
                        console.log(response);
                        props.actionLogin({username, password, ...response.data});
                    }
                ).catch((response)=>{
                    setSendErr("Пара логин и пароль не верны");
                });
        }
        else{
            setSendErr("Исправьте ошибки!")
        }
    }

    if (props.isLogin)
        return (<Redirect to='/users' />);
    return(
        <div className="authComponent">
            <span><b>username:</b></span>
            <input type="text" placeholder="Enter username..." value={username} onChange={handleChangeField.bind(this, "username")}/>
            <label>{userErr}</label>

            <span><b>password: </b></span>
            <input type="text" placeholder="Enter password..." value={password} onChange={handleChangeField.bind(this, "password")}/>
            <label>{passErr}</label>
            <button onClick={handleClickLogin}>Войти</button>
            <span className="infoSend">{sendErr}</span>
        </div>
    )
}

export default connect(mapStateToProps('AuthComponent'),mapDispatchToProps('AuthComponent'))(AuthComponent);