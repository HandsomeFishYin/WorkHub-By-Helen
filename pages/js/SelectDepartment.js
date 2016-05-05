/**
 * Created by HelenYin on 2016/3/3.
 */
import React from 'react';
export default class SelectDepartment extends React.Component {


    render(){
        var departmentProps = this.props.department;
        //debugger;
        return (
            <option>{departmentProps.D_NAME}</option>
        )
    }
}