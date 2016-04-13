/**
 * Created by HelenYin on 2016/3/4.
 */
import $ from 'jquery';
import React from 'react'
import SearchInput from './SearchInput.js'
import SearchUserItem from './SearchUserItem.js'
export default class SearchContent extends React.Component{

    constructor(props) {
        super(props);
        var gotUserSource = this._getSource();
        //debugger;
        this.state={
            "userList": gotUserSource.Body.response.Data,
            "showUserList":gotUserSource.Body.response.Data,
            "matchIndex":[]
        }
    }

    _getSource(){
        var userSource;
        $.ajax({
            url: 'http://totoro:6002/',
            type: 'post',
            contentType: "application/json",
            data:JSON.stringify({"Header": {"LoginName": "NDOaqxpE9mT5a5xZ","UserName": "王道斌","CompanyShowID": "35b11f42f4522d8923","CompanyCode": "Mintcode","AuthToken":
                "I11+qpJIXINObzieQSm/zbaT4dU=","ResourceUri": "/Base-Module/CompanyUser/GetList","async": false,"type": "GET","Language": "zh-cn"},"Body": {"param": {"deptId": "7a73dfe6424716a4f81",
                "isContainChildDept": 1, "currentPage": 0, "pageSize":0, "searchKey": ""}}}),
            async: false//使用同步的方式,true为异步方式
        }).success(function (data) {
            //console.log(data);
            userSource=data

        });
        return userSource;
    }

    _searchResult (nameValve){  //搜索人员姓名的函数，绑在searchbtn上
        var newUserItemList = [];
        //console.log('name',nameValve);//至此能获取input搜索输入框的内
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
                showUserList: newUserItemList
            }
        )
    }
    render (){
        return(
            <div>
                <a href="./index.html">返回首页</a>

                <SearchInput searchFun = {this._searchResult.bind(this) }/>

                <ul>
                    {this.state.showUserList.map(function (item, index) {
                        return ( < SearchUserItem user = {item} index={index} key={index}/>)  }.bind(this))}  {/*当使用map时一定要加key 可以提高效率 在这里将user这个新的对象传进去*/}
                </ul>

            </div>
        )
    }

}