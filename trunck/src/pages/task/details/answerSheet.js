import React from 'react';
import { connect } from 'dva';
import { Spin} from 'antd';
import { getPageQuery } from '../../../utils/utils';
import TopNav from '../../../components/nav';
import { TaskDescribe, TaskQuestion } from "../../../components/task";
import { formatDate2, isNull } from '../../../utils/utils';
@connect(({ task }) => ({ task }))
export default class AnswerSheet extends React.Component{
    constructor(props){
        super(props);
        const params = getPageQuery();
        let { taskNo } = params;
        this.getQuestionTaskDetail(taskNo);
    }

    getQuestionTaskDetail = (taskid) => {
        this.props.dispatch({
            type: "task/getQuestionTaskDetail",
            payload: {
                // taskStudentId: "13748f3b16cc43bea6470c09e5bdfa6b",
                taskStudentId: taskid
            }
        })
    }

    refComplete = () => {
        console.log("完成答题");
    }


    render(){
        const { loading, questionModuleInfo } = this.props.task;
        console.log(questionModuleInfo);
        return (<Spin spinning={loading}>
            {isNull(questionModuleInfo) ? <div/> : <div>
                <TopNav title={questionModuleInfo.moduleName} onLeftClick={this.back}></TopNav>
                <TaskDescribe endtime={formatDate2(questionModuleInfo.taskEndTime)} describe={questionModuleInfo.taskRequire} />
                <TaskQuestion taskType={"testing"} complete={this.refComplete}></TaskQuestion>
            </div>
            }
        </Spin>)
    }
}