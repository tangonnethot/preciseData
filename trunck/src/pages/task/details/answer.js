import React from 'react';
import { connect } from 'dva';
import { Spin} from 'antd';
import { getPageQuery } from '../../../utils/utils';
import TopNav from '../../../components/nav';
import { TaskDescribe, TaskQuestion } from "../../../components/task";
import { formatDate2, isNull } from '../../../utils/utils';
import Styles from './answer.less';
class AnswerResult extends React.Component{
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
                taskStudentId: "59c3611d88184832a0327c285c790add",
                // taskStudentId: taskNo,
            }
        })
    }

   
    render(){
        const { loading, questionModuleInfo } = this.props.task;
        console.log(questionModuleInfo);
        return (
            // isNull(questionModuleInfo) ? <div/> : 
            <div>
                <TopNav title={questionModuleInfo.moduleName} onLeftClick={this.back}></TopNav>
                {/* <div className={Styles.blue_bg}>
                    <img src="../../assets/resultScore.png"></img>
                </div> */}
                {/* <TaskDescribe endtime={formatDate2(questionModuleInfo.taskEndTime)} describe={questionModuleInfo.taskRequire} /> */}
                <TaskQuestion taskType={"testing"} complete={this.refComplete}></TaskQuestion>
            </div>
            
        )
    }
}

export default connect(({ task }) => ({ task:task }))(AnswerResult)
