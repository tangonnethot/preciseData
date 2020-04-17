import React from 'react'
import Styles from './index.less'
import { dateFormat } from '../../utils/utils';

export default class TaskDescribe extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let endTime = dateFormat(this.props.endtime,'yyyy.MM.dd hh:mm');
        if(endTime && endTime.split(" ")[0]=="2099.12.31"){
            endTime ="无"
        }
        return (
            <div className={Styles.describe}>
                <div className={Styles.describetr}>截止时间：{endTime}</div>
                <div className={Styles.describetr}>任务要求：{this.props.describe}</div>               
                {this.props.question &&<div><span>{this.props.question}</span></div>
                }
            </div>)
    }
}