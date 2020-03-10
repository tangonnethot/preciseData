
import React from 'react';
import { connect } from 'dva';
import { Spin, Button } from 'antd';
import { getPageQuery } from '../../../utils/utils';
import TopNav from '../../../components/nav';
import { TaskDescribe, TaskRef } from "../../../components/task";
import { formatDate2, isNull, getUserID } from '../../../utils/utils';
@connect(({ task }) => ({ task }))
export default class Reference extends React.Component {
    constructor(props) {
        super(props);
        const params = getPageQuery();
        let { taskNo } = params;
        this.getTaskDetail(taskNo);
    }

    getTaskDetail = (taskid) => {
        this.props.dispatch({
            type: "task/getRefTaskDetail",
            payload: {
                // taskStudentId: "3440719660c042d4b877833a7938f080",
                taskStudentId: taskid
            }
        })
    }

    refComplete = () => {
        console.log("完成任务");
    }

    render() {
        const { loading, refModuleInfo } = this.props.task;
        console.log(refModuleInfo);
        return (<Spin spinning={loading}>
            {isNull(refModuleInfo) ? <div/> : <div>
                <TopNav title={refModuleInfo.moduleName} onLeftClick={this.back}></TopNav>
                <TaskDescribe endtime={formatDate2(refModuleInfo.taskEndTime)} describe={refModuleInfo.taskRequire} />
                <TaskRef isCourse={false} complete={this.refComplete}></TaskRef>
            </div>
            }
        </Spin>)
    }
}