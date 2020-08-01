import React from 'react'
import axios from 'axios'
import mapStateToProps from './redux/mapStateToProps'
import mapDispatchToProps from './redux/mapDispatchToProps'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import imgdown from "./resources/arrow-down-outline.svg"
import imgup from "./resources/arrow-up-outline.svg"
import lodash from 'lodash'
class ContentPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            filterField: '',
            data: [],
            sort: 'asc',  // 'desc'
            sortField: 'id',
            filter:''
        }
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.handleClickFilter = this.handleClickFilter.bind(this);
        this.handleClickSort = this.handleClickSort.bind(this);
    };


    componentDidMount() {
        if (this.props.token!=='')
        axios.get("http://emphasoft-test-assignment.herokuapp.com/api/v1/users/", this.props.authHeader).then((response)=>{
            console.log(response);
            this.setState({data: response.data});
        });
    }

    handleChangeFilter(event){
        const filterField = event.target.value;
        this.setState({filterField});
    }

    handleClickFilter(){
        this.setState(state =>{return {filter: state.filterField}});
    }
    handleClickSort(){
        this.setState(state => {return{sort: (state.sort === 'asc' ? 'desc' : 'asc')}});
    }

    getFilteredData(currentdata, search){
        if (!search) {
            return currentdata;
        }
        var result = currentdata.filter(item => {
            return (""+item["username"]).toLowerCase().includes(search.toLowerCase());
        });
        // if(!result.length){
        //     result = currentdata;
        // }
        return result;
    }
    handleClickRow(id){
        this.props.history.push("/users/"+id);
    }

    render() {
        // <Link to={`/users/${item.id}`}>
        const data = this.state.data;
        const filterdata = this.getFilteredData(data, this.state.filter);
        const sortdata = lodash.orderBy(filterdata, 'id', this.state.sort);
        let content = sortdata.map((item,index)=>{
            return (<tr key={item.username} onClick={this.handleClickRow.bind(this, item.id )}>

                <td width="5%" onClick={this.handleClickSort} >{item.id}</td>
                <td >{item.username}</td>
                <td>{item.first_name?item.first_name:'-'}</td>
                <td width="20%" >{item.last_name?item.last_name:'-'}</td>
                <td>{item.last_login? item.last_login:"-"}</td>
                <td>{item.is_active? "Да":"Нет"}</td>
                <td>{item.is_superuser? "Да":"Нет"}</td>

            </tr>)
        });
        if (this.props.token==='')
            return(<Redirect to='/' />);
        return(
            <>
                {/*<Redirect to="users/new"/>*/}
                <div className="upPanel">
                    <div>
                        <input type='text' value={this.state.filterField} onChange={this.handleChangeFilter} />
                        <button onClick={this.handleClickFilter}> Найти </button>
                    </div>
                    <Link to="users/new"> <button >Создать пользователя </button></Link>
                </div>
                <div className="tableBox">
                    <table >
                        <thead>
                            <tr>
                                <th width="6%" onClick={this.handleClickSort}>ID <img width="12" height="15" alt="" src={this.state.sort=== 'asc'? imgdown:imgup}/></th>
                                <th>Username</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th width="14%">Last Login<br/></th>
                                <th width="9%">Active</th>
                                <th width="14%">Superuser status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps('ContentPage'),mapDispatchToProps('ContentPage'))(ContentPage);