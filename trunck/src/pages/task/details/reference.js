
import React from 'react';
import { connect } from 'dva';
import { Spin, Button } from 'antd';
import { Toast} from 'antd-mobile';
import { getPageQuery } from '../../../utils/utils';
import TopNav from '../../../components/nav';
import { TaskDescribe, TaskRef } from "../../../components/task";
import { isNull, getUserID } from '../../../utils/utils';
import {submitTask} from "../../../services/task";
import { goHome , releaseAudio } from "../../../utils/andriod";
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
        _this.props.dispatch({
            type: "task/fetch/start"
        })
        submitTask({
            id:_this.props.task.moduleContentList[_this.state.taskid].refModuleInfo.id,
            // id:"d92a468cd49d4e8ca86193a658047c10",
            moduleAnswerTime:time,
            taskStudentTopicList:[]
        }).then(function(res){
            if(res.code==200){
                Toast.success("提交成功",2,()=>{
                    _this.props.dispatch({
                        type: "task/fetch/end"
                    })
                    _this.props.history.replace("/task")
                });
            }else{
                _this.props.dispatch({
                    type: "task/fetch/end"
                })
                Toast.fail('提交失败，请稍后重试', 2);
            }
        })
    }
    back = ()=>{
        if( this.props.history && this.props.history.length == 1 ){
            goHome();
        }else{
            this.props.history.replace("/task")
        }
    }
    componentWillUnmount(){
        releaseAudio();
    }
    render() {
        const { loading} = this.props.task;
        if(!this.props.task.moduleContentList[this.state.taskid])
            return(<Spin  tip="数据加载中" ></Spin>);

        const{refModuleInfo} = this.props.task.moduleContentList[this.state.taskid];

        return (<Spin spinning={loading}  tip="数据加载中" >
            {isNull(refModuleInfo) ? <div/> : <div>
                <TopNav title={refModuleInfo.moduleName} onLeftClick={this.back}></TopNav>
                <TaskDescribe endtime={refModuleInfo.taskEndTime} describe={refModuleInfo.taskRequire} />
                <TaskRef isCourse={false} moduleID={this.state.taskid} complete={this.refComplete}></TaskRef>
            </div>
            }
        </Spin>)
    }
}