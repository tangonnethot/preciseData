import React from 'react';
import { connect } from "dva";
import {Button} from 'antd';
import { isNull,startTime,endTime } from '../../utils/utils';
import Attachment from '../attachment';
import {Answer} from '../examin/student';
import Styles from './index.less';

@connect(({ task }) => ({ task }))
export default class TaskQuestion extends React.Component {
    constructor(props) {
        super(props);
        startTime();
        if (this.props.taskType == "course")
            this.getModuleInfo();
        this.state={
            answerlist:[]
        }
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

    onComplete=()=>{
        this.props.complete(endTime(),this.answerlist);
    }

    changeAnswer=(answer,index)=>{
        this.setState({
            answerlist:Object.assign(this.state.answerlist,{[index]:answer})
        })
    }

    render() {
        // const content = this.convertContent();
        const {questionContent} = this.props.task.questionModuleInfo;
        console.log(questionContent);
        let _this =this;
        const renderQuestion = (questionItem,index) => {
            let stemContent;
            if (questionItem.hasOwnProperty("topic")) {
                stemContent = questionItem.topic;
            } else {
                stemContent = questionItem;
            }
            return (<div className={Styles.ques_item}>
                     <Answer 
              question={stemContent}
              optionClick={(ans,index)=>_this.schangeAnswer}
              userAnswer={this.state.answerlist[index]?this.state.answerlist[index]:''}
            />
                {/* <div>{question.sort}</div>
                <div dangerouslySetInnerHTML={{ __html: stemContent }}></div> */}
            </div>)
        }
        return (
            isNull(questionContent) ? <div></div> : <div>
                {questionContent.topics.map(element => renderQuestion(element)
                )}
                <div></div>
                <Button onClick={this.onComplete}>完成做答</Button>
            </div>)
    }
}