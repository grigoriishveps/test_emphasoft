import React, {useState} from 'react'
import axios from 'axios'
import mapStateToProps from './redux/mapStateToProps'
import mapDispatchToProps from './redux/mapDispatchToProps'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

function NewUserComponent (props){
    const [username, setUsername] = useState('fsdfdfsd');
    const [password, setPassword] = useState('sdf23423');
    const [first_name, setFirst] = useState('');
    const [last_name, setLast] = useState('');
    const [is_active, setActive] = useState(true);

    const [userErr, setUserErr] = useState('Не пусто');
    const [passErr, setPassErr] = useState('Должно быть больше 8');
    const [firstErr, setFirstErr] = useState('');
    const [lastErr, setLastErr] = useState('');

    let handleChangeField = (field, event) =>{
        const value = event.target.value;
        let err = ''
        switch (field){
            case "username":
                setUsername(value);
                err = (!value.match(/^[\w\d._+@]*$/))?"Только буквы, цифры и (+_-.@":"";
                err += (value.length> 150)?"Не более 150 символов":"";
                err += (value.length< 1)?"Не пусто":"";
                setUserErr(err);
                break;
            case "password":
                setPassword(value);
                err = (!value.match(/^(?=.*[A-Z])(?=.*\d).{8,}$/))?"Только буквы, цифры и (+_-.@":"";
                err += (value.length> 128)?"Не более 128 символов":"";
                err += (value.length < 9)?"Введите больше 8 символов":"";
                setPassErr(err);
                break;
            case "first":
                setFirst(value);
                setFirstErr((value.length> 30)?"Не более 30 символов":"")
                break;
            case "last":
                setLast(value);
                setLastErr((value.length> 150)?"Не более 150 символов":"");
                break;
        }
    }

    let handleChangeChecked = ( event) =>{
        const value = event.target.checked;
        setActive(value);
        //
    }

    let handleClickReg = ()=>{
        console.log({username, password, first_name, last_name, is_active});
        axios.post("http://emphasoft-test-assignment.herokuapp.com/api/v1/users/",{username, password, first_name, last_name, is_active} , props.authHeader).then(
            (response)=>{
                console.log(response);
            }).catch((response)=>{
            console.log(response);
        });
    }

    if (props.token==='')
        return(<Redirect to='/' />);
    return(
        <div className="editComponent">

            <span><b>username:</b></span>
            <input type="text" className="charField" value={username} onChange={handleChangeField.bind( this, "username")} />
            <label>{userErr}</label>

            <span><b>password: </b></span>
            <input type="text" className="charField" value={password} onChange={handleChangeField.bind( this, "password")} />
            <label>{passErr}</label>

            <span><b>first_name: </b></span>
            <input type="text" className="charField" value={first_name} onChange={handleChangeField.bind( this, "first")} />
            <label>{firstErr}</label>

            <span><b>last_name: </b></span>
            <input type="text" className="charField" value={last_name} onChange={handleChangeField.bind( this, "last")} />
            <label>{lastErr}</label>

            {/*<span><b>last_login: </b></span>*/}
            {/*<input type="text" className="charField" value={last_name} onChange={handleChangeField.bind( this, "diet")} />*/}
            <div>
                <span><b>{"Active  "} </b></span>
                <input type="checkbox" checked={is_active} onChange={handleChangeChecked.bind(this)}/>
            </div>

            <div className="buttonBox">
                <button onClick={handleClickReg}>Зарегистрировать</button>
                <Link to={'/users'}> <button >Вернуться назад</button></Link>
            </div>

        </div>

    )

}

export default connect(mapStateToProps('NewUserComponent'),mapDispatchToProps('NewUserComponent'))(NewUserComponent);