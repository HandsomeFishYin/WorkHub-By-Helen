/**
 * Created by HelenYin on 2016/3/4.
 */
import React from 'react'
import _ from 'underscore';
export default class SearchUserItem extends React.Component{

    render(){
        var userProps = this.props.user;
        //debugger;
        return (
            <li>
                <span name="U_TRUE_NAME" className="tableCell"  >{userProps.U_TRUE_NAME}</span>
                <span name="D_NAME" className="tableCell" >{userProps.D_NAME}</span>
                <span name="U_MAIL" className="tableCell">{userProps.U_MAIL}</span>
                <span name="U_MOBILE" className="tableCell" >{userProps.U_MOBILE}</span>
                <span name="U_JOB" className="tableCell">{userProps.U_JOB}</span>
            </li>
        )
    }

}