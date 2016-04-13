/**
 * Created by HelenYin on 2016/3/1.
 */
import React from 'react';
import _ from 'underscore';

export default class UserItem extends React.Component{
    constructor(props) {
        super(props);
        this.state=_.extend({},this.props)
    }

    setValue  (e) {
        var value = e.target.textContent;
        var name = e.target.attributes['name'].value;
        this.state.user[name] = value;
    }

    render(){
        var userProps = this.props.user;
        //debugger;
        return (
            <tr>
                <td name="U_TRUE_NAME" className="tableCell" contentEditable={true} onBlur={this.setValue.bind(this)}>{userProps.U_TRUE_NAME}</td>
                <td name="D_NAME" className="tableCell" onBlur={this.setValue.bind(this)}>{userProps.D_NAME}</td>
                <td name="U_MAIL" className="tableCell" contentEditable={true} onBlur={this.setValue.bind(this)}>{userProps.U_MAIL}</td>
                <td name="U_MOBILE" className="tableCell" contentEditable={true} onBlur={this.setValue.bind(this)}>{userProps.U_MOBILE}</td>
                <td name="U_JOB" className="tableCell" contentEditable={true} onBlur={this.setValue.bind(this)}>{userProps.U_JOB}</td>
                <td  className="tableCell delbtn" onClick={this.props.delFun.bind(this, "delete", this.props.user.SHOW_ID)}>削除</td>
                <td  className="tableCell savebtn" onClick={this.props.delFun.bind(this, "edit", this.props.user.SHOW_ID, this.state.user)}>保存</td>
            </tr>
        )
    }
}