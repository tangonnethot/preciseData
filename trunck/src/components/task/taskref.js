import React from 'react'
import { Button } from 'antd'
import { connect } from "dva"

@connect(({ task }) => ({ task }))
export default class TaskRef extends React.Component {
    constructor(props) {
        super(props);
        this.getModuleInfo();
    }

    getModuleInfo = () => {
        this.props.dispatch({
            type: "task/getCourseModuleInfo",
            payload: {
                taskStudentModuleId: this.props.moduleID,
            }
        })
    }

    render() {
        const { refModuleInfo } = this.props.task;
        return (<div>
            <div>{refModuleInfo.moduleContent}</div>
            <Button onclick={this.props.complete}>完成学习</Button>
        </div>)
    }
}