/**
 * Created by HelenYin on 2016/3/2.
 */
import React from 'react'

export default class SearchInput extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            "NAME_VALUE":""
    };
    }
    _getValue (e){
        var value = e.target.value;
        this.state.NAME_VALUE = value;
    };
    _searchUser (){
        this.props.searchFun && this.props.searchFun(this.state.NAME_VALUE);
    };
    render (){
        return(
            <div style={{margin:'20px 0'}}>
                <input type="search" onBlur={this._getValue.bind(this)} placeholder="请输入人员姓名"/>
                <span className="searchbtn" onClick={this._searchUser.bind(this)}>搜索</span>
            </div>
        )
    }

}