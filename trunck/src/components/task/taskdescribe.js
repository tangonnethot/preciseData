import React from 'react'
import Styles from './index.less'

export default class TaskDescribe extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={Styles.describe}>
                <div><span>截止时间：</span><span>{this.props.endtime}</span></div>
                <div><span>任务要求</span><span>{this.props.describe}</span></div>
                {this.props.question && <div>共{this.props.question.count}道题 满分{this.props.question.score} 
                </div>
                }
            </div>)
    }
}