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

    // getAnswerOrder =(topicBranches,content)=>{
    //     let arrOrder =[];
    //     if(topicBranches)
    //     for(let index =0;index<topicBranches.length;index++){
    //         if(content.find(topicBranches[index].option)>=0){
    //             arrOrder.push(topicBranches[index].brchOrder)
    //         }
    //     }
    //     return arrOrder.join(",");
    // }

    // getAnswerBranchOrder = (id,idx,content)=>{
    //     const {topics} = this.props.task.questionModuleInfo.questionContent;
    //     if(content==null) return '';
    //     if(idx>=0 && idx<topics.length &&topics[idx].id==id){
    //         return this.getAnswerOrder(topics[idx].topicBranches,content);
    //      }
    //     this.findAnswer(id,content,topics)
    //    return '';
    // }

    // findAnswer=(id,content,questionContent)=>{       
    //      for(let index =0;index<questionContent.length;index++){
    //          if(questionContent[index].id==id){
    //              return this.getAnswerOrder(questionContent[index].topicBranches,content);
    //          }
    //          if(questionContent[index].type=="1078"){
    //             this.findAnswer(id,content,questionContent[index].topics);
    //          }
    //      }       
    // }

    convertAnswerList=()=>{
        return this.props.task.answerList.map((element,index)=>{
            if(element.topicType=="1076" ||element.topicType=="1077" ){
                let arrContent = element.answerContent.split("");
                let newarrContent =arrContent.map(element=>{
                    return String.fromCharCode(element.charCodeAt()-16);
                })
                element.answerContent = newarrContent.join(",");
                // if(element.answerContent){
                //     // element.answerContent = this.getAnswerBranchOrder(element.topicId,index,element.answerContent);
                // }
            }
            return element;
        }) 
    }

    onComplete = () => {
        this.props.complete(endTime(), this.convertAnswerList());
    }

    onSave = () => {
        this.props.saveAnswer(endTime(), this.convertAnswerList());
    }

    changeAnswer = (answer, id) => {
        debugger        
        this.props.dispatch({
            type: "task/updateAnswerList",
            payload: {
                id: id,
                answer: answer
            }
        })
    }

    getQuestionAnswer =(questionItem,index)=>{
        let answer;
            if(questionItem.type!="1078"){
                
            }
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
            debugger
            if(questionItem.type!="1078"){
                answer.push(answerList[answeridx].answerContent);
                answeridx++;
            }else{
                let childCount =questionItem.topics.length;
                for(let j=0;j<childCount;j++){
                    answer.push(answerList[answeridx].answerContent);
                    answeridx++;
                }
            }
            console.log(answer);
            return (<div className={Styles.ques_item}>
                <Answer
                    question={stemContent}
                    optionClick={(ans, index) => _this.changeAnswer(ans, index)}
                    userAnswer={answer.join(",")}
                />
            </div>)
        }

        return (
            isNull(questionContent) ? <div></div> : <div className={Styles.questionContainer}>
                {questionContent.topics.map((element, idx) => renderQuestion(element, idx)
                )}
                <TaskStatistics />               
                <div className={Styles.btnContainer}>
                    <button className={Styles.savebtn} onClick={this.onSave}>保存</button>
                    <button className={Styles.submitbtn} onClick={this.onComplete}>提交</button>
                </div>
            </div>)
    }
}