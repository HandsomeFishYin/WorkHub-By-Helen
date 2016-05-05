/**
 * Created by HelenYin on 2016/3/10.
 */
import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';


export default class DepartmentTreeItem extends React.Component {

    constructor(props) {
        super(props);
        var isShowChild = this.props.isShowChild;
        var treeArr = this.props.data;
        this.state = {
            "isShowChild": false,
            "selectName":""
        };
    }

    _setChild(obj) {
        return (<DepartmentTreeItem data={obj} gotChooseDept = {this.props.gotChooseDept.bind(this)}/>);
    }

    _funShowChild() {
        this.setState(
            {
                isShowChild: !this.state.isShowChild
            }
        );
    }

    render() {
        var treeArr = this.props.data;
        //console.log(treeArr);
        return (
            <li>

                <span onClick={this._funShowChild.bind(this)}
                      className={classNames({"cursor-pointer":treeArr.children && treeArr.children.length >0})}>{( treeArr.children && treeArr.children.length > 0 && !this.state.isShowChild) ?
                    <span className="treeIcon">+</span> : <span className="treeIcon">-</span>}</span>


                <span className="cursor-pointer" onClick = {this.props.gotChooseDept && this.props.gotChooseDept.bind(this,treeArr)}>{treeArr.D_NAME}</span>

                {
                    treeArr.children && treeArr.children.length > 0 && this.state.isShowChild &&
                    <ul>
                        {treeArr.children.map(this._setChild.bind(this))}
                    </ul>
                }
            </li>
        )
    }
}