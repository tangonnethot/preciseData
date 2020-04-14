import React from 'react';
import { connect } from 'dva';
import { Result } from '../examin/student';
import Styles from './index.less';
import { Spin } from "antd";
import { isNull } from '../../utils/utils';
import TaskStatistics from './taskStatistics';

class TaskResult extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.taskType === "course")
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

    changeAnswer = (answer, topicId,id) => {
        this.props.dispatch({
            type: "task/updateRAnswerList",
            payload: {
                moduleid:this.props.moduleID,
                topicId,
                id,
                answer
            }
        })
    }
    render() {
        if (!this.props.task.moduleContentList[this.props.moduleID])
            return (<Spin  tip="数据加载中" />);
        const { questionContent } = this.props.task.moduleContentList[this.props.moduleID].questionModuleInfo;
        const { answerList } = this.props.task.moduleContentList[this.props.moduleID];
        let _this = this;
        let answeridx = 0;
        const renderQuestion = (questionItem, index) => {
            let stemContent;
            if (questionItem.hasOwnProperty("topic")) {
                stemContent = questionItem.topic;
            } else {
                stemContent = questionItem;
            }

            let answer = [];
            let score = [];
            let correctAnswer = [];
            let qtype = stemContent.type;
            if (qtype != "1078") {
                stemContent["_id"]=answerList[answeridx].id;
                answer.push(answerList[answeridx].answerContent);
                answerList[answeridx].correctContent && correctAnswer.push(answerList[answeridx].correctContent);
                if (answerList[answeridx].examinesState == 2) {
                    score.push(answerList[answeridx].answerScore);
                } else {
                    score.push(-1);
                }
                stemContent["_id"]=answerList[answeridx].id;
                answeridx++;
            } else {
                let childCount = stemContent.topics.length;
                for (let j = 0; j < childCount; j++) {
                    answer.push(answerList[answeridx].answerContent);
                    answerList[answeridx].correctContent && correctAnswer.push(answerList[answeridx].correctContent);
                    if (answerList[answeridx].examinesState == 2) {
                        score.push(answerList[answeridx].answerScore);
                    } else {
                        score.push(-1);
                    }

                    stemContent.topics[j]["_id"]=answerList[answeridx].id;
                    answeridx++;
                }
            }
            return (<div className={Styles.ques_item}>
                <Result
                    question={stemContent}
                    optionClick={(ans, topicId) => {
                        _this.changeAnswer(ans, topicId,stemContent["_id"])
                    }}
                    userAnswer={answer.join(";")}
                    revisedAnswer={correctAnswer.join(";")}
                    userScore={score.join(";")}
                />
            </div>)
        }

        return (
            isNull(questionContent) ? <div></div> : <div className={Styles.questionContainer}>
                {questionContent.topics.map((element, idx) => renderQuestion(element, idx)
                )}
                {this.props.footer ? <TaskStatistics answerList={answerList} showMarking={true} /> : <div />}
                {/* <div className={Styles.ref_btn_container}><button onClick={this.onComplete} className={Styles.complete_btn}>完成学习</button></div>} */}
            </div>)
    }
}

export default connect((task) => (task))(TaskResult);