import React from 'react'
import {SegmentedControl} from 'antd-mobile'
import Styles from './index.less'
import {getSubjects} from '../../services/task'
export default class SubjectNav extends React.PureComponent{
    constructor(props){
        super(props);
        this.initSubject();
        this.state={
            subjects:[],
            loading:false
        }
    }

    initSubject=()=>{
        let _this=this;
        getSubjects().then(function(res){
            _this.setState({
                subjects:res.data
            }); 
        });
    }

    // subjects = [{
    //     id: "1",
    //     title: "全部"
    // }, {
    //     id: "103",
    //     title: "语文"
    // }, {
    //     id: "100",
    //     title: "数学"
    // }, {
    //     id: "100",
    //     title: "英语"
    // }, {
    //     id: "100",
    //     title: "物理"
    // }, {
    //     id: "100",
    //     title: "化学"
    // }, {
    //     id: "100",
    //     title: "政治"
    // }, {
    //     id: "100",
    //     title: "历史"
    // },]

    onSelChange=(e)=>{
        let subjectid = "0";
        if(e.nativeEvent.selectedSegmentIndex>0){
            subjectid = this.state.subjects[e.nativeEvent.selectedSegmentIndex-1].value;
        }
        this.props.onChange(subjectid);
        // console.log(e);
    }

    render(){
        var  value = ["全部"];
        this.state.subjects && this.state.subjects.forEach(element => {
            // if(element.value<=166 || element.value==265)
                value.push(element.name);
        });
        return((value.length>0)&&<div className={Styles.subject}>
        <SegmentedControl onChange={this.onSelChange} values ={value} /></div>)
    }
}