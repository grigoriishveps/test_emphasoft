import React from 'react'
import axios from 'axios'
import mapStateToProps from './redux/mapStateToProps'
import mapDispatchToProps from './redux/mapDispatchToProps'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

class EditComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            is_active: false,
            userErr: "",
            passErr: "",
            firstErr: "",
            lastErr: ""
        }
        this.handleClickUpdate = this.handleClickUpdate.bind(this);
    };


    componentDidMount() {
        if (this.props.token!=='')
            axios.get(`http://emphasoft-test-assignment.herokuapp.com/api/v1/users/${this.props.match.params.id}/`, this.props.authHeader).then((response)=>{
                console.log(response);
                this.setState({...response.data});
            });
    }

    handleChangeField(field, event){
        const value = event.target.value;
        let err = '';
        switch (field){
            case "username":
                err = (!value.match(/^[\w\d._+@]*$/))?"Только буквы, цифры и (+_-.@":"";
                err += (value.length> 150)?"Не более 150 символов":"";
                err += (value.length< 1)?"Не пусто":"";
                this.setState({username:value, userErr: err});
                break;
            case "password":
                err = (!value.match(/^(?=.*[A-Z])(?=.*\d).{8,}$/))?"Только буквы, цифры и (+_-.@":"";
                err += (value.length> 128)?"Не более 128 символов":"";
                err += (value.length < 9)?"Должно быть больше 8":"";
                this.setState({password:value, passErr: err});
                break;
            case "first":
                this.setState({first_name:value, firstErr: ((value.length> 30)?"Не более 30 символов":"")});
                break;
            case "last":
                this.setState({last_name:value, lastErr: ((value.length> 150)?"Не более 150 символов":"")});
                break;
        }
    }
    handleChangeChecked ( event) {
        const value = event.target.checked;
        this.setState({is_active:value});
    }
    handleClickUpdate(){
        console.log(this.props);
        let {userErr, passErr, firstErr, lastErr} = this.state;
        if(userErr ==="" && (passErr==="" || this.state.password==="")&& firstErr ==="" && lastErr===""){
            axios.patch(`http://emphasoft-test-assignment.herokuapp.com/api/v1/users/${this.props.match.params.id}/`, {
                username:this.state.username,
                password: this.state.password,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                is_active: this.state.is_active}, this.props.authHeader).then(
                (response)=>{
                    console.log(response);
                }
            );
        }
    }

    render() {
        if (this.props.token==='')
            return(<Redirect to='/' />);
        return(
            <div className="editComponent">
                <span><b>username:</b></span>
                <input type="text" className="charField" value={this.state.username} onChange={this.handleChangeField.bind( this, "username")} />
                <label>{this.state.userErr}</label>

                <span><b>password: </b></span>
                <input type="text" className="charField" value={this.state.password} onChange={this.handleChangeField.bind( this, "password")} />
                <label>{this.state.passErr}</label>

                <span><b>first_name: </b></span>
                <input type="text" className="charField" value={this.state.first_name} onChange={this.handleChangeField.bind( this, "first")} />
                <label>{this.state.firstErr}</label>

                <span><b>last_name: </b></span>
                <input type="text" className="charField" value={this.state.last_name} onChange={this.handleChangeField.bind( this, "last")} />
                <label>{this.state.lastErr}</label>

                <div>
                    <span><b>{"Active  "} </b></span>
                    <input type="checkbox" checked={this.state.is_active} onChange={this.handleChangeChecked.bind(this)}/>
                </div>
                <div className="buttonBox">
                    <button onClick={this.handleClickUpdate}>Сохранить</button>
                    <Link to={'/users'}> <button >Вернуться назад</button></Link>
                </div>
            </div>

        )
    }
}

export default connect(mapStateToProps('EditComponent'),mapDispatchToProps('EditComponent'))(EditComponent);