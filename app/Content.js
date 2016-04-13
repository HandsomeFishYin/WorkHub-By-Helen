/**
 * Created by HelenYin on 2016/3/1.
 */
import $ from 'jquery';
import React from 'react';
import UserItem from './UserItem.js';
import SearchInput from './SearchInput.js';
import AddUser from './AddUser.js';
import Slider from './Slider.js';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        var gotUserSource = this._getSource();

        //console.log("gotDepSource",gotDepSource)
        //debugger;
            this.state={
            "userList": gotUserSource.Body.response.Data,
            "isShow": false,
            "matchIndex":[],
            "showDeptAddSlider":false,
            "sliderWidth":'0px'
        }
    }


    _setUser (type, showId="", userObj = null) {
        var newUserList = [];
        var user = {
            "U_TRUE_NAME": userObj.U_TRUE_NAME,
            "D_NAME": userObj.D_NAME,
            "U_MAIL": userObj.U_MAIL,
            "U_MOBILE": userObj.U_MOBILE,
            "U_JOB": userObj.U_JOB,
            "U_DEPT_ID" : userObj.U_DEPT_ID,
            "SHOW_ID":userObj.SHOW_ID
        };
        if (type == "delete") {
            this._delData(showId);
            //newUserList.splice(index, 1);

            var r = confirm("确认删除吗？");
            if (r==true)
            {
                this.state.userList.map(function(item,index){
                    if(item.SHOW_ID != showId) {
                        newUserList.push(item);
                    }

                });
                this.setState(
                    {
                        userList: newUserList
                    }
                );
            }

        } else if (type == "edit") {//
            console.log("user",user);
            this._changeUserData(user);
            //newUserList.splice(index, 1, user);
            this.state.userList.map(function(item,index){
                if(item.SHOW_ID != showId) {
                    newUserList.push(item);
                }
                else{
                    newUserList.push(user);
                }

            });
            this.setState(
                {
                    userList: newUserList
                })
        } else {  //添加用户
            this._addData(user);
            //newUserList.splice(this.state.userList.length, 0, user);
            this.state.userList.map(function(item,index){
                    newUserList.push(item);
            });
            newUserList.push(user);
            this.setState(
                {
                    isShow: !this.state.isShow,
                    userList: newUserList
                }
            )
        }
    }



    _judgeInput (){  //判断子组件的输入的input是否显示
        this.setState({
            isShow: !this.state.isShow,
            showDeptAddSlider : false
        })
    }



    _getSource(keyWord=""){
        var userSource;
        $.ajax({
            url: 'http://totoro:6002/',
            type: 'post',
            contentType: "application/json",
            data:JSON.stringify({"Header": {"LoginName": "NDOaqxpE9mT5a5xZ","UserName": "王道斌","CompanyShowID": "35b11f42f4522d8923","CompanyCode": "Mintcode","AuthToken": "I11+qpJIXINObzieQSm/zbaT4dU=","ResourceUri": "/Base-Module/CompanyUser/GetList","async": false,"type": "GET","Language": "zh-cn"},"Body": {"param": {"deptId": "", "isContainChildDept": 1, "currentPage": 0, "pageSize":0, "searchKey": keyWord}}}),
            async: false//使用同步的方式,true为异步方式
        }).success(function (data) {
            //console.log(JSON.stringify(data));
            userSource=data
        });
        return userSource;
    }

    _searchSource(str){
        var searchResultList =  this._getSource(str);

        this.setState(
            {
                userList:searchResultList.Body.response.Data,
                showDeptAddSlider : false
            }
        );
    }


    _delData(delId){
        $.ajax({
            url: 'http://totoro:6002/',
            type: 'post',
            contentType: "application/json",
            data:JSON.stringify({"Header": {"LoginName": "NDOaqxpE9mT5a5xZ","UserName": "王道斌","CompanyShowID": "35b11f42f4522d8923","CompanyCode": "Mintcode","AuthToken": "I11+qpJIXINObzieQSm/zbaT4dU=","ResourceUri": "/Base-Module/CompanyUser","async": false,"type": "DELETE","Language": "zh-cn"},"Body": {"param": {"SHOW_ID": delId}}}),
            async: false//使用同步的方式,true为异步方式
        }).success(function (data) {
            console.log('delete',data);
        });
    }

    _addData(obj){
        //debugger;
        $.ajax({
            url: 'http://totoro:6002/',
            type: 'post',
            contentType: "application/json",
            data:JSON.stringify({"Header": {"LoginName": "NDOaqxpE9mT5a5xZ","UserName": "王道斌","CompanyShowID": "35b11f42f4522d8923","CompanyCode": "Mintcode","AuthToken": "I11+qpJIXINObzieQSm/zbaT4dU=","ResourceUri": "/Base-Module/CompanyUser","async": false,"type": "PUT","Language": "zh-cn"},"Body": {"param": {"U_DEPT_ID": obj.U_DEPT_ID,"U_JOB":obj.U_JOB,"U_MOBILE":obj.U_MOBILE,"U_NUMBER":"1","U_MAIL":obj.U_MAIL,"U_TRUE_NAME":obj.U_TRUE_NAME,"U_STATUS":1}}}),
            async: false//使用同步的方式,true为异步方式
        }).success(function (data) {
            if(data.Header.IsSuccess){
                alert("添加成功！")
            }else{
                alert(data.Header.Reason)
            }
            console.log('add',data);
        });
    }

    _changeUserData(obj){
        $.ajax({
            url: 'http://totoro:6002/',
            type: 'post',
            contentType: "application/json",
            data:JSON.stringify({"Header":
            {"LoginName": "NDOaqxpE9mT5a5xZ","UserName": "王道斌","CompanyShowID": "35b11f42f4522d8923","CompanyCode": "Mintcode","AuthToken": "I11+qpJIXINObzieQSm/zbaT4dU=","ResourceUri": "/Base-Module/CompanyUser","async": false,"type": "POST","Language": "zh-cn"},"Body": {"param": {"U_DEPT_ID": obj.U_DEPT_ID,"U_JOB":obj.U_JOB,"U_MOBILE":obj.U_MOBILE,"U_NUMBER":"1","U_MAIL":obj.U_MAIL,"U_TRUE_NAME":obj.U_TRUE_NAME,"SHOW_ID":obj.SHOW_ID,"U_STATUS":1}}}),
            async: false//使用同步的方式,true为异步方式
        }).success(function (data) {
            console.log('editUser',data);
        });
    }

    _searchResult (nameValve){  //搜索人员姓名的函数，绑在searchbtn上
        var newUserItemList = [];
        //console.log(nameValve);//至此能获取input搜索输入框的内
        var arrIndex = this.state.matchIndex;
        this.state.userList.map(
            function(item,index){
                if( item.U_TRUE_NAME.indexOf(nameValve)>=0){
                    arrIndex.push(index);
                    newUserItemList.push(item);
                }
            }
        );
        this.setState(
            {
                userList: newUserItemList
            }
        )
    }

    _judgeAddDeptSlider(){
        //debugger;
        this.setState(
            {
                "isShow": false,
                showDeptAddSlider:true
            }
        );
    }



    render() {
        return (
            <div>
                <h1 className="mainTitle"><span className="mainTitle" style={{"text-shadow": '0 0 35px #0784F5'}}>Helenの楽屋管理システム</span>     <span className="subtitle" style={{marginLeft:20}}>---2016.3.15</span></h1>
                <div className = "introduceTitle">ビジネスパーソンに楽しさと驚きを与えるサービスの創造</div>


                <div className="text-center addbtnWrapper">
                    <span className="savebtn" onClick = {this._judgeInput.bind(this)}>新しい社員を追加して</span>
                    <SearchInput searchFun = {this._searchSource.bind(this) }/>
                </div>



                <div className="text-center">
                    <span className="cursor-pointer savebtn" onClick = {this._judgeAddDeptSlider.bind(this)}>追加部門</span>
                    <Slider isShow={this.state.showDeptAddSlider} />
                </div>





                {this.state.isShow && <AddUser addFun = {this._setUser.bind(this)}/>}

                <div className="text-center">
                    <table className="contentList">
                        <tbody>
                        <tr style={{"background":"#2e527e"}}>
                            <th>ユーザ名</th>
                            <th>ユーザ部門</th>
                            <th>電子メール</th>
                            <th>携帯電話番号</th>
                            <th>ポスト</th>
                            <th>削除操作</th>
                            <th>保存操作</th>
                        </tr>
                        {this.state.userList.map(function (item, index) {
                            return ( < UserItem user = {item} delFun = {this._setUser.bind(this) }  key={index}/>)  }.bind(this))}  {/*当使用map时一定要加key 可以提高效率 在这里将user这个新的对象传进去*/}
                        </tbody>
                    </table>
                </div>





            </div>
        )
    }
}