import React from 'react'
import Styles from './index.less'

export default class TaskDescribe extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={Styles.describe}>
                <div className={Styles.describetr}>截止时间：{this.props.endtime.date}&nbsp;{this.props.endtime.time}</div>
                <div className={Styles.describetr}>任务要求：{this.props.describe}</div>               
                {this.props.question &&<div><span>{this.props.question}</span></div>
                }
            </div>)
    }
}