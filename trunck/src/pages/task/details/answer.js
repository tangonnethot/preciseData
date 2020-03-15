import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import { getPageQuery,formatDate2, isNull } from '../../../utils/utils';
import TopNav from '../../../components/nav';
import {TaskResult } from "../../../components/task";
import Styles from './answer.less';
import classnames from 'classnames';

class AnswerResult extends React.Component {
    constructor(props) {
        super(props);
        const params = getPageQuery();
        let { taskNo } = params;
        this.getQuestionTaskDetail(taskNo);
    }

    getQuestionTaskDetail = (taskid) => {
        this.props.dispatch({
            type: "task/getQuestionTaskDetail",
            payload: {
                taskStudentId: "59c3611d88184832a0327c285c790add",
                // taskStudentId: taskNo,
            }
        })
    }


    render() {
        const { loading, questionModuleInfo,answerList } = this.props.task;
        console.log(questionModuleInfo);
        const renderNumberItem=(item,index)=>{
            return(!item.answerContent?<div className={Styles.item_number} >{index+1}</div>:            
                item.isRight?
                <div className={classnames(Styles.item_number,Styles.green)} >{index+1}</div>:
                <div className={classnames(Styles.item_number,Styles.red)} >{index+1}</div>
            )
        }
        let formatEndtime =formatDate2(questionModuleInfo.taskEndTime);
        let finishEndtime =formatDate2(questionModuleInfo.moduleFinishTime);
        let reviewtime = formatDate2(questionModuleInfo.updateTime);
        return (
            isNull(questionModuleInfo) ? <div/> : 

            <div>
                <TopNav title={questionModuleInfo.moduleName} onLeftClick={this.back}></TopNav>
                <div className={Styles.blue_container}>
                    <div>
                        <img style={{marginLeft:"-20px"}} src={require("../../../assets/resultScore.png")}></img>
                        <div style={{marginTop:"-160px"}}>得分率：{questionModuleInfo.moduleScore}%</div>
                        <div style={{paddingTop:"14px",color:"#FF3030",fontSize:"50px"}}>{questionModuleInfo.moduleScore}分</div>
                        <div>满分：100分</div>
                        <div className={Styles.time_container}><span>答题时间：</span><span>{finishEndtime.date}</span><span className={Styles.paddingLeft10}>{finishEndtime.time}</span></div>
                        <div className={Styles.time_container}><span>截止时间：</span><span>{formatEndtime.date}</span><span className={Styles.paddingLeft10}>{formatEndtime.time}</span></div>
                        <div style={{marginTop:"32px",fontSize:"@content-big-font-size"}}><span>阅卷人：</span><span>{questionModuleInfo.moduleCorrectorName}</span>
                        <span className={Styles.paddingLeft20}>阅卷时间：</span><span>{reviewtime.date}</span><span className={Styles.paddingLeft10}>{reviewtime.time}</span></div>

                    </div>
                    <div className={Styles.statistics}>
            <div className={Styles.title}>{questionModuleInfo.questionContent.testPaperTop}</div>
            <div>{
                answerList.map((element,idx)=>renderNumberItem(element,idx))
            }</div>
        </div>
                </div>
                <TaskResult moduleID={this.state.taskNo}></TaskResult>
                {/* <TaskDescribe endtime={formatDate2(questionModuleInfo.taskEndTime)} describe={questionModuleInfo.taskRequire} /> */}
                {/* <TaskQuestion taskType={"testing"} complete={this.refComplete}></TaskQuestion> */}
            </div>

        )
    }
}

export default connect(({ task }) => ({ task: task }))(AnswerResult)
