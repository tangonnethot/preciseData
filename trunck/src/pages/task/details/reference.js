
import React from 'react';
import { connect } from 'dva';
import { Spin,Button } from 'antd';
import { getPageQuery } from '../../../utils/utils';
import TopNav from '../../../components/nav';
import { TaskDescribe, TaskRef } from "../../../components/task";
@connect(({ task }) => ({ task }))
export default class Reference extends React.Component{
    constructor(props){
        super(props);
        const params = getPageQuery();
        let { taskNo } = params;
        this.getTaskDetail(taskNo);
    }

    getTaskDetail = (taskid) => {
        this.props.dispatch({
            type: "task/getRefTaskDetail",
            payload: {
                taskStudentId: "de2bb12751fa44188549c4d073681297",
                // taskStudentId: taskNo,
            }
        })
    }

    refComplete = () => {
        console.log("完成任务");
    }

    render(){
        const {loading}=this.props.task;
        return (<Spin spinning={loading}>
            {/* {isNull(taskModuleInfo)?<div/>:<div>
            <TopNav title={taskModuleInfo.taskName} onLeftClick={this.back}></TopNav>
            <TaskDescribe endtime={formatDate2(taskModuleInfo.taskEndTime)} describe={taskModuleInfo.taskRequire} />            
                {taskModuleInfo.taskStudentModuleList.map(element =>renderCard(element))}
                </div>
            }            */}
        </Spin>)
    }
}