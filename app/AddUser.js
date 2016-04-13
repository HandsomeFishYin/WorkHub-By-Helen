/**
 * Created by HelenYin on 2016/3/2.
 */
import $ from 'jquery';
import React from 'react'
import SelectDepartment from './SelectDepartment.js'

export default class AddUser extends React.Component{
    constructor(props) {
        super(props);
        var gotDepSource = this._getDepartment();
        //debugger;
        this.state =  {
            "newUser": {
                "U_TRUE_NAME": "",
                "D_NAME": "Zeus",
                "U_MAIL": "",
                "U_MOBILE": "",
                "U_JOB": "",
                "U_DEPT_ID":"7a73dfe6424716a4f81"
            },
            "departmentList":gotDepSource.Body.response.Data //获取部门列表赋值state
        }

    };
    _getDepartment(){
        var departmentSource;
        $.ajax({
            url: 'http://totoro:6002/',
            type: 'post',
            contentType: "application/json",
            data:JSON.stringify({"Header": {"LoginName": "NDOaqxpE9mT5a5xZ","UserName": "王道斌","CompanyShowID": "35b11f42f4522d8923","CompanyCode": "Mintcode","AuthToken": "I11+qpJIXINObzieQSm/zbaT4dU=","ResourceUri": "/Base-Module/CompanyDept/GetList","async": false,"type": "GET","Language": "zh-cn"},"Body": {"param": {"currentPage": 0, "pageSize":0}}}),
            async: false//使用同步的方式,true为异步方式
        }).success(function (data) {
            departmentSource = data;
            console.log('get department',data);
        });
        return departmentSource;
    }

    setValue (e) {
        var value = e.target.value;
        var name = e.target.name;
        var re;
        if (name == "U_MAIL"){
            re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if(!re.test(value)){
                alert ("邮箱格式不正确，请重新输入！");
                e.target.value="";
            }
        }
        if(name == "U_MOBILE"){
            re = /^1\d{10}$/;
            if(!re.test(value)){
                alert ("手机号码格式不正确，请重新输入！");
                e.target.value="";
            }
        }
        if(name == "U_TRUE_NAME"){
            if(value ==""){
                alert("请输入姓名！")
            }
        }
        this.state.newUser[name] = value;
    };

    _getDeptId(e){
        var  value = e.target.value;
        var deptId ;
        this.state.departmentList.map(function(item,index){
            if(item.D_NAME == value) {
                deptId = item.SHOW_ID;
            }
        });
        this.state.newUser.U_DEPT_ID = deptId;
        this.state.newUser.D_NAME = value;
        //debugger;
    }

    addUser () {
        this.props.addFun && this.props.addFun("add", "", this.state.newUser);
    };
    render () {
        return (
            <div className="text-center addWrapper">
                <input  name ="U_TRUE_NAME" onBlur={this.setValue.bind(this)}/>
                <select className="textSelect" name="D_NAME" onBlur ={this._getDeptId.bind(this)}>
                    {this.state.departmentList.map(function(item,index){
                        return(<SelectDepartment department = {item} />)
                    })}
                </select>
                <input name="U_MAIL" onBlur={this.setValue.bind(this)}/>
                <input name="U_MOBILE" onBlur={this.setValue.bind(this)}/>
                <input name="U_JOB" onBlur={this.setValue.bind(this)}/>
                <span className="savebtn"  onClick={this.addUser.bind(this)}>保存</span>
            </div>
        )
    }

}