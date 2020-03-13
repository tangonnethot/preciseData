import React from 'react';
import { connect } from "dva";
import { isNull, startTime, endTime } from '../../utils/utils';
import Attachment from '../attachment';
import { Answer } from '../examin/student';
import Styles from './index.less';
import TaskStatistics from './taskStatistics';

@connect(({ task }) => ({ task }))
export default class TaskQuestion extends React.Component {
    constructor(props) {
        super(props);
        startTime();
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

    onComplete = () => {
        this.props.complete(endTime(), this.answerlist);
    }

    onSave = () => {
        this.props.saveAnswer(endTime(), this.answerlist);
    }

    changeAnswer = (answer, index) => {
        this.props.dispatch({
            type: "task/updateAnswerList",
            payload: {
                idx: 4,
                answer: answer
            }
        })
    }


    render() {
        const { questionContent } = this.props.task.questionModuleInfo;
        const { answerList } = this.props.task;
        let _this = this;
        const renderQuestion = (questionItem, index) => {
            let stemContent;
            if (questionItem.hasOwnProperty("topic")) {
                stemContent = questionItem.topic;
            } else {
                stemContent = questionItem;
            }
            return (<div className={Styles.ques_item}>
                <Answer
                    question={stemContent}
                    optionClick={(ans, index) => _this.changeAnswer(ans, index)}
                    userAnswer={answerList[index] ? answerList[index].answerContent : ''}
                />

            </div>)
        }

        return (
            isNull(questionContent) ? <div></div> : <div className={Styles.questionContainer}>
                {questionContent.topics.map((element, idx) => renderQuestion(element, idx)
                )}
                <TaskStatistics />
                {/* <div className={Styles.statistics}>
                    <div className={Styles.title}>答案统计</div>
                    <div>{
                        answerList.map((element,idx)=>renderNumberItem(element,idx))
                    }</div>
                </div> */}
                <div className={Styles.btnContainer}><button className={Styles.savebtn}>保存</button>
                    <button className={Styles.submitbtn} onClick={this.onComplete}>提交</button>
                </div>
            </div>)
    }
}