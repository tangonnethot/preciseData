
import React from 'react';
import { connect } from 'dva';
import { Spin, Button } from 'antd';
import { Toast} from 'antd-mobile';
import { getPageQuery } from '../../../utils/utils';
import TopNav from '../../../components/nav';
import { TaskDescribe, TaskRef } from "../../../components/task";
import { formatDate2, isNull, getUserID } from '../../../utils/utils';
import {submitTask} from "../../../services/task"
@connect(({ task }) => ({ task }))
export default class Reference extends React.Component {
    constructor(props) {
        super(props);
        const params = getPageQuery();
        let { taskNo } = params;
        this.state ={
            taskid:taskNo
        }
        this.getTaskDetail(taskNo);
    }

    getTaskDetail = (taskid) => {
        this.props.dispatch({
            type: "task/getRefTaskDetail",
            payload: {
                // taskStudentId: "20a7b9bbd74a40b4be5a944d52ee48c3",
                taskStudentId: taskid
            }
        })
    }

    refComplete = (time) => {
        let _this =this;
        submitTask({
            id:_this.props.task.moduleContentList[_this.state.taskid].refModuleInfo.id,
            // id:"d92a468cd49d4e8ca86193a658047c10",
            moduleAnswerTime:time,
            taskStudentTopicList:[]
        }).then(function(res){
            if(res.code==200){
                Toast.success("提交成功",2,()=>{_this.props.history.push("/task")});
            }else{
                Toast.fail('提交失败，请稍后重试', 2);
            }
        })
    }

    render() {
        const { loading} = this.props.task;
        if(!this.props.task.moduleContentList[this.state.taskid])
            return(<Spin></Spin>);

        const{refModuleInfo} = this.props.task.moduleContentList[this.state.taskid];

        // console.log(refModuleInfo);
        return (<Spin spinning={loading}>
            {isNull(refModuleInfo) ? <div/> : <div>
                <TopNav title={refModuleInfo.moduleName} onLeftClick={this.back}></TopNav>
                <TaskDescribe endtime={formatDate2(refModuleInfo.taskEndTime)} describe={refModuleInfo.taskRequire} />
                <TaskRef isCourse={false} moduleID={this.state.taskid} complete={this.refComplete}></TaskRef>
            </div>
            }
        </Spin>)
    }
}