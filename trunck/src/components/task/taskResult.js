import React from 'react';
import { connect } from 'dva';
import {Result} from '../examin/student';
import Styles from './index.less';
import { isNull} from '../../utils/utils';
import TaskStatistics from './taskStatistics';

class TaskResult extends React.Component{
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

     render() {
        const { questionContent } = this.props.task.questionModuleInfo;
        const { answerList } = this.props.task;
        let _this = this;
        let answeridx =0;
        const renderQuestion = (questionItem, index) => {
            let stemContent;
            if (questionItem.hasOwnProperty("topic")) {
                stemContent = questionItem.topic;
            } else {
                stemContent = questionItem;
            }

            let answer=[];
            let score =[];
            let qtype = stemContent.type;
            if(qtype!="1078"){
                answer.push(answerList[answeridx].answerContent);
                score.push(answerList[answeridx].answerScore);
                answeridx++;
            }else{
                let childCount =stemContent.topics.length;
                for(let j=0;j<childCount;j++){
                    answer.push(answerList[answeridx].answerContent);
                    score.push(answerList[answeridx].answerScore);
                    answeridx++;
                }
            }
            debugger
            console.log(answer);
            return (<div className={Styles.ques_item}>
                <Result
                    question={stemContent}
                    optionClick={(ans, index) => _this.changeAnswer(ans, index)}
                    userAnswer={answer.join(";")}
                    userScore={score.join(";")}
                />
            </div>)
        }

        return (
            isNull(questionContent) ? <div></div> : <div className={Styles.questionContainer}>
                {questionContent.topics.map((element, idx) => renderQuestion(element, idx)
                )}
                {this.props.footer?<TaskStatistics />:<div/>}
                {/* <div className={Styles.ref_btn_container}><button onClick={this.onComplete} className={Styles.complete_btn}>完成学习</button></div>} */}
            </div>)
    }
}

export default connect((task)=>(task))(TaskResult);