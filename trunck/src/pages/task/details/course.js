import React from 'react'
import { Card } from 'antd-mobile'
import { Spin,Button } from 'antd'
import { getPageQuery } from '../../../utils/utils'
import { connect } from 'dva';
import TopNav from '../../../components/nav';
import { TaskDescribe, TaskRef, TaskQuestion } from "../../../components/task";
import { formatDate2, isNull, getUserID } from '../../../utils/utils';

@connect(({ task }) => ({ task }))
export default class CourseDetails extends React.Component {
    constructor(props) {
        super(props);
        const params = getPageQuery();
        let { taskNo } = params;
        this.getCourseDetail(taskNo);
    }

    getCourseDetail = (taskNo) => {
        this.props.dispatch({
            type: "task/getCourseDetail",
            payload: {
                taskStudentId: "3c5866e44e8c4033ab6e855c2af8fbf3",
                studentId: "9d43a478532545adaabd9482d67a74da"
                // taskStudentId: taskNo,
                // studentId:getUserID()
            }
        })
    }

    refComplete = () => {
        console.log("完成任务");
    }

    render() {
        const { taskModuleInfo, loading } = this.props.task;
        const renderCard = (element)=>{
            if (element.moduleType == 1) {
                return <Card full="true">
                    <Card.Header title={element.moduleName}
                        extra={element.answerStatus==0?<Button>开始学习</Button>:<Button>已完成</Button>} />
                    <Card.Body>
                        <TaskRef moduleID={element.id} complete={this.refComplete}></TaskRef>
                    </Card.Body>
                </Card>
            }
            if(element.moduleType==2){
                return <Card full="true">
                <Card.Header title={element.moduleName}
                    extra={element.answerStatus==0?<Button>开始答题</Button>:<Button>已完成</Button>} />
                <Card.Body>
                    <TaskQuestion moduleID={element.id} complete={this.refComplete}></TaskQuestion>
                </Card.Body>
            </Card>
            }
        }
        return (<Spin spinning={loading}>
            {isNull(taskModuleInfo)?<div/>:<div>
            <TopNav title={taskModuleInfo.taskName} onLeftClick={this.back}></TopNav>
            <TaskDescribe endtime={formatDate2(taskModuleInfo.taskEndTime)} describe={taskModuleInfo.taskRequire} />            
                {taskModuleInfo.taskStudentModuleList.map(element =>renderCard(element))}
                </div>
            }           
        </Spin>)
    }
}