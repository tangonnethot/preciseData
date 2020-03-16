import React from 'react';
import { connect } from 'dva';
import { Spin} from 'antd';
import { Toast} from 'antd-mobile';
import { getPageQuery } from '../../../utils/utils';
import TopNav from '../../../components/nav';
import { TaskDescribe, TaskQuestion } from "../../../components/task";
import { formatDate2, isNull } from '../../../utils/utils';
import {submitTask,saveTask} from "../../../services/task"
@connect(({ task }) => ({ task }))
export default class Testing extends React.Component{
    constructor(props){
        super(props);
        const params = getPageQuery();
        let { taskNo } = params;
        this.state ={
            taskid:taskNo
        }
        this.getQuestionTaskDetail(taskNo);
    }

    getQuestionTaskDetail = (taskid) => {
        this.props.dispatch({
            type: "task/getQuestionTaskDetail",
            payload: {
                // taskStudentId: "1a06b5245a0745b792610839d32f3af0",
                taskStudentId: taskid
            }
        })
    }

    answerComplete = (time,anserlist) => {
        let _this =this;
        submitTask({
            id:_this.props.task.moduleContentList[_this.state.taskid].questionModuleInfo.id,
            moduleAnswerTime:time,
            taskStudentTopicList:anserlist
        }).then(function(res){
            if(res.code==200){
                Toast.success("提交成功",2,()=>{_this.props.history.push("/taskresult?taskNo="+_this.state.taskid)});
            }else{
                Toast.fail('提交失败，请稍后重试', 2);
            }
        })
    }

    saveAnswer =(time,answerlist)=>{
        let _this =this;
        saveTask({
            id:_this.props.task.moduleContentList[_this.state.taskid].questionModuleInfo.id,
            moduleAnswerTime:time,
            taskStudentTopicList:answerlist
        }).then(function(res){
            if(res.code==200){
                Toast.success("提交成功",2,()=>{_this.props.history.push("/task")});
            }else{
                Toast.fail('提交失败，请稍后重试', 2);
            }
        })
    }

    render(){
        const {loading} = this.props.task;
        if(!this.props.task.moduleContentList[this.state.taskid])
            return(<Spin></Spin>)
        const {questionModuleInfo} = this.props.task.moduleContentList[this.state.taskid];

        return (<Spin spinning={loading}>
            {isNull(questionModuleInfo) ? <div/> : <div>
                <TopNav title={questionModuleInfo.moduleName} onLeftClick={this.back}></TopNav>
                <TaskDescribe endtime={formatDate2(questionModuleInfo.taskEndTime)} describe={questionModuleInfo.taskRequire} question={questionModuleInfo.questionContent.testPaperTop}  />
                <TaskQuestion moduleID={this.state.taskid} taskType={"testing"} complete={this.answerComplete.bind(this)} saveAnswer={this.saveAnswer.bind(this)}></TaskQuestion>
            </div>
            }
        </Spin>)
    }
}