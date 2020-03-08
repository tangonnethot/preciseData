import React from 'react'
import { connect } from "dva"
import { isNull } from '../../utils/utils'
import Attachment from '../attachment'

@connect(({ task }) => ({ task }))
export default class TaskQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.getModuleInfo();
    }

    getModuleInfo = () => {
        this.props.dispatch({
            type: "task/getQuestionModuleInfo",
            payload: {
                taskStudentModuleId: this.props.moduleID,
            }
        })
    }
    convertContent = () => {
        if (isNull(this.props.task.questionModuleInfo) || isNull(this.props.task.questionModuleInfo.moduleContent)) return null;
        let content = JSON.parse(this.props.task.questionModuleInfo.moduleContent);
        return content.courseModule;
    }

    render() {
        const content = this.convertContent();
        console.log(content);
        const renderQuestion=(question)=>{
            return(<div>
                <div>{question.sort}</div>
                <div dangerouslySetInnerHTML={{ __html: question.topic.content }}></div>
                </div>)
        }
        return (
            isNull(content) ? <div></div> : <div>
                {content.practises.map(element=>renderQuestion(element)
                )}
                <button onclick={this.props.complete}>完成做答</button>
            </div>)
    }
}