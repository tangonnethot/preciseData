import React from 'react'
import { connect } from "dva"
import { isNull } from '../../utils/utils'
import Attachment from '../attachment'

@connect(({ task }) => ({ task }))
export default class TaskQuestion extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.taskType == "course")
            this.getModuleInfo();
    }

    getModuleInfo = () => {
        if (!this.props.moduleID) return;
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
        let question = {};
        if (this.props.taskType == "course") {
            question.topics = content.courseModule.practises;
        } else {
            question = content;
        }
        return question;
        // return content.courseModule;
    }

    render() {
        const content = this.convertContent();
        console.log(content);
        const renderQuestion = (question) => {
            let questionContent = "";
            if (question.hasOwnProperty("topic")) {
                questionContent = question.topic.content;
            } else {
                questionContent = question.content;
            }
            return (<div>
                <div>{question.sort}</div>
                <div dangerouslySetInnerHTML={{ __html: questionContent }}></div>
            </div>)
        }
        return (
            isNull(content) ? <div></div> : <div>
                {content.topics.map(element => renderQuestion(element)
                )}
                <button onclick={this.props.complete}>完成做答</button>
            </div>)
    }
}