import React from 'react'
import { Card } from 'antd-mobile'
import { getPageQuery } from '../../../utils/utils'
import task from '../../../models/task';
import { connect } from 'dva';
import TopNav from '../../../components/nav';
import {TaskDescribe,TaskRef,TaskQuestion} from "../../../components/task";

@connect(({ task }) => ({ task }))
export default class CourseDetails extends React.Component {
    constructor(props) {
        super(props);
        const params = getPageQuery();
        let { taskNo } = params;
        this.getCourseDetail(taskNo);
    }

    getCourseDetail=(taskNo)=>{
        this.props.dispatch({
            type: "task/getCourseDetail",
            payload: {
                taskStudentId: taskNo
            }
        })
    }

    refComplete=()=>{
        console.log("完成任务");
    }

    render() {
        // console.log(this.props.task.moduleList);
        const{moduleList,taskname} = this.props.task;
        return (<div>
            <TopNav title={taskname} onLeftClick={this.back}></TopNav>
            <TaskDescribe endtime={"2020.4.5."} describe={"任务详情描述"}/>
            <Card full="true">
            <Card.Header title="知识梳理"            
            extra={<button>开始学习</button>}/>
            <Card.Body>
            <TaskRef content={"sdfsdfsdfsdfasdfsadfsdf"} complete={this.refComplete}></TaskRef>
            </Card.Body>
            </Card>
            <Card full="true">
            <Card.Header title="知识梳理"            
            extra={<button>开始学习</button>}/>
            <Card.Body>
            <TaskQuestion></TaskQuestion>
            </Card.Body>
            </Card>
        </div>)
    }
}