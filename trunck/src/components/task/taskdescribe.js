import React from 'react'
import Styles from './index.less'

export default class TaskDescribe extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={Styles.describe}>
                <div><span>截止时间：</span><span>{this.props.endtime.date}</span><span style={{ paddingLeft: "16px" }}>{this.props.endtime.time}</span></div>
                <div><span>任务要求：</span><span>{this.props.describe}</span></div>               
                {this.props.question &&<div><span>{this.props.question}</span></div>
                }
            </div>)
    }
}