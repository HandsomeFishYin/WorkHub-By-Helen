/**
 * Created by HelenYin on 2016/3/9.
 */
import $ from 'jquery';
import React from 'react'
import DepartmentTreeItem from './DepartmentTreeItem.js'
export default class DepartmentTree extends React.Component{
    constructor(props) {
        super(props);
        var gotDepSource = this._getDepartment();
        var treedata = gotDepSource.Body.response.Data;
        this.state={
            "departmentList": gotDepSource.Body.response.Data,//获取部门列表赋值state
            "treeResult":this._buildArrTree( treedata,"35b11f42f4522d8923"),
        };
    }


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
            //console.log('get department',data);
        });
        return departmentSource;
    }

    _buildArrTree(data,pid){  //将列表变成树的函数
        var result = [] , temp;
        for(var i = 0; i < data.length; i++){
            if(data[i].D_PARENTID_SHOW_ID==pid){
                result.push(data[i]);
                temp = this._buildArrTree(data,data[i].SHOW_ID);
                if(temp.length>0){
                    data[i].children=temp;
                }
            }
        }
        //console.log(JSON.stringify(result));
        return result;
    }



    _setChild(obj){  //设置子部门的函数
        return (<DepartmentTreeItem data={obj} gotChooseDept = {this.props.ChosenDept.bind(this)}/>);
    }



    render (){
        return(
            <div>
                <div className="departTree">
                    <ul >
                        {this.state.treeResult.map(this._setChild.bind(this))}
                    </ul>
                </div>
            </div>
        )
    }

}