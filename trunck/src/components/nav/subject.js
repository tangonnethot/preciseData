import React from 'react'
import {SegmentedControl} from 'antd-mobile'
import Styles from './index.less'

export default class SubjectNav extends React.Component{
    constructor(props){
        super(props);
    }

    subjects = [{
        id: "1",
        title: "全部"
    }, {
        id: "103",
        title: "语文"
    }, {
        id: "100",
        title: "数学"
    }, {
        id: "100",
        title: "英语"
    }, {
        id: "100",
        title: "物理"
    }, {
        id: "100",
        title: "化学"
    }, {
        id: "100",
        title: "政治"
    }, {
        id: "100",
        title: "历史"
    },]

    onSelChange=(e)=>{
        console.log(e);
    }

    render(){
        var  value = []
        this.subjects.forEach(element => {
            value.push(element.title);
        });
        console.log(value);
        return(<SegmentedControl className={Styles.subject} onChange={this.onSelChange} values ={value}></SegmentedControl>)
    }
}