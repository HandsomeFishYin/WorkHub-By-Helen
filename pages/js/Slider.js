/**
 * Created by HelenYin on 2016/3/14.
 */
import $ from 'jquery';
import React from 'react';
import DepartmentTree from './DepartmentTree.js'
export default class Slider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "active": this.props.isShow,
            "resultWidth": '0px',
            "width":this.props.width,
            "pDeptName":'未选择',
            "pDept":null,
            "addDeptName":''
        };
    }

    componentWillReceiveProps(props){
        this.setState({
            active:props.isShow
        })
    }

    _closeSlider(){
        this.setState({
            active:false
        })
    }

    //获取选中的部门名称
    _getChooseDept(obj){
        //debugger;
        this.setState({
            pDeptName :obj.D_NAME,
            pDept :obj
        })
    }

    //获得待添加部门名称
    _getValue(e){
        var value = e.target.value;
        this.setState({
            addDeptName : value
        });
        //debugger;
    }

    //ajax添加
    _funAddDept(){
        debugger;
        if(this.state.addDeptName!="" && this.state.pDept != null)
        {
            $.ajax({
                url: 'http://totoro:6002/',
                type: 'post',
                contentType: "application/json",
                data:JSON.stringify({"Header":
                {"LoginName": "NDOaqxpE9mT5a5xZ","UserName": "王道斌","CompanyShowID": "35b11f42f4522d8923","CompanyCode": "Mintcode","AuthToken": "I11+qpJIXINObzieQSm/zbaT4dU=","ResourceUri": "/Base-Module/CompanyDept","async": false,"type": "PUT","Language": "zh-cn"},"Body": {"param": {"D_NAME": this.state.addDeptName,"D_PARENTID_SHOW_ID":this.state.pDept.SHOW_ID}}}),
                async: false//使用同步的方式,true为异步方式
            }).success(function (data) {
                console.log('editUser',data);
                if(data.Header.IsSuccess){
                    alert('添加成功！');
                }else{
                    alert('添加失败！');
                }
                this.setState({
                    active:false
                })
            }.bind(this));
        }else{
            alert("上级部门名称未填或者待添加部门名称未填！")
        }


    }

    render(){
        var active = this.props.isShow;
        let resultWidth = this.state.active ? '650px': '0px';
        //debugger;
        return (

            <div className="slider" style={{width:resultWidth}}>
                <div className="inner-slider">
                    <p style={{textAlign:'right'}} className="cursor-pointer" onClick = {this._closeSlider.bind(this)}>閉鎖</p>
                    {this.state.active && <div>

                        <div className="addDeptWrapper">
                            <span>上級部門の名称： &nbsp;&nbsp;</span> <span >{this.state.pDeptName}</span>
                        </div>

                        <div className="addDeptWrapper">
                            <div>
                                <input type="text" placeholder="追加部門名" onBlur = {this._getValue.bind(this)}/>
                                <span className="searchbtn" onClick = {this._funAddDept.bind(this)}>確認の追加</span>
                            </div>
                        </div>

                        <DepartmentTree ChosenDept = {this._getChooseDept.bind(this)}/>
                    </div>}

                </div>
                </div>
        )
    }
}