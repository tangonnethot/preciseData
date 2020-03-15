import React from 'react'
import { Card, Toast } from 'antd-mobile'
import { Spin, Button } from 'antd'
import { getPageQuery } from '../../../utils/utils'
import { connect } from 'dva';
import TopNav from '../../../components/nav';
import { TaskDescribe, TaskRef, TaskQuestion, TaskResult } from "../../../components/task";
import { formatDate2, isNull, getUserID } from '../../../utils/utils';
import Styles from './course.less';
import { submitTask, saveTask } from "../../../services/task"

@connect(({ task }) => ({ task }))
export default class CourseDetails extends React.Component {
    constructor(props) {
        super(props);
        const params = getPageQuery();
        let { taskNo } = params;
        this.getCourseDetail(taskNo);
        this.state = {
            expandIndex: -1
        }
    }

    getCourseDetail = (taskNo) => {
        this.props.dispatch({
            type: "task/getCourseDetail",
            payload: {
                taskStudentId: taskNo,
                studentId: getUserID()
            }
        })
    }

    refComplete = (time) => {
        debugger
        let _this = this;
        submitTask({
            id: _this.props.task.refModuleInfo.id,
            // id:"d92a468cd49d4e8ca86193a658047c10",
            moduleAnswerTime: time,
            taskStudentTopicList: []
        }).then(function (res) {
            if (res.code == 200) {
                Toast.success("提交成功", 2);
                _this.setState({
                    expandIndex: -1
                })
            } else {
                Toast.fail('提交失败，请稍后重试', 2);
            }
        })
    }

    expand = (index) => {
        this.setState({
            expandIndex: index
        })
    }

    reduceCard = () => {
        debugger
        this.setState({
            expandIndex: -1
        })
    }

    answerComplete = (time, anserlist) => {
        let _this = this;
        submitTask({
            id: _this.props.task.questionModuleInfo.id,
            moduleAnswerTime: time,
            taskStudentTopicList: anserlist
        }).then(function (res) {
            if (res.code == 200) {
                Toast.success("提交成功", 2);
                _this.setState({
                    expandIndex: -1
                })
            } else {
                Toast.fail('提交失败，请稍后重试', 2);
            }
        })
    }

    saveAnswer = (time, answerlist) => {
        let _this = this;
        saveTask({
            id: _this.props.task.questionModuleInfo.id,
            moduleAnswerTime: time,
            taskStudentTopicList: answerlist
        }).then(function (res) {
            if (res.code == 200) {
                Toast.success("提交成功", 2);
                _this.setState({
                    expandIndex: -1
                });
            } else {
                Toast.fail('提交失败，请稍后重试', 2);
            }
        })
    }

    render() {
        const { taskModuleInfo, loading } = this.props.task;
        const renderCard = (element, idx) => {
            if (element.moduleType == 1) {
                return <div className={Styles.card_container} Style={idx == this.state.expandIndex ? "height:auto" : ""} ><Card full="true">
                    <Card.Header title={element.moduleName}
                        extra={element.answerStatus == 0 ? <Button type="primary" onClick={this.expand.bind(this, idx)}>开始学习</Button> : <Button type="primary" onClick={this.expand.bind(this, idx)}>查看学习资料</Button>} />
                    <Card.Body>
                        <TaskRef isCourse={true} moduleID={element.id} complete={this.refComplete.bind(this)}></TaskRef>
                        {element.answerStatus>0?<div className={Styles.btn_container}>
                                <button className={Styles.complete_btn} onClick={this.reduceCard}>完成学习</button>
                            </div>:<div/>}
                    </Card.Body>
                </Card>
                </div>
            }
            if (element.moduleType == 2) {
                if (element.answerStatus == 0) {
                    return <div className={Styles.card_container} Style={idx == this.state.expandIndex ? "height:auto" : ""}><Card full="true">
                        <Card.Header title={element.moduleName}
                            extra={<Button type="primary" onClick={this.expand.bind(this, idx)}>开始做答</Button>} />
                        <Card.Body>
                            <TaskQuestion taskType={"course"} moduleID={element.id} complete={this.answerComplete.bind(this)} saveAnswer={this.saveAnswer.bind(this)}></TaskQuestion>
                        </Card.Body>
                    </Card></div>
                } else {
                    return <div className={Styles.card_container} Style={idx == this.state.expandIndex ? "height:auto" : ""}><Card full="true">
                        <Card.Header title={element.moduleName}
                            extra={<Button type="primary" onClick={this.expand.bind(this, idx)}>查看做答结果</Button>} />
                        <Card.Body>
                            <TaskResult taskType={"course"} moduleID={element.id}></TaskResult>
                            <div className={Styles.btn_container}>
                                <button className={Styles.complete_btn} onClick={this.reduceCard}>完成学习</button>
                            </div>
                        </Card.Body>
                    </Card></div>
                }

            }
        }
        return (<Spin spinning={loading}>
            {isNull(taskModuleInfo) ? <div /> : <div clasNam={Styles.course_container}>
                <TopNav title={taskModuleInfo.taskName} onLeftClick={this.back}></TopNav>
                <TaskDescribe endtime={formatDate2(taskModuleInfo.taskEndTime)} describe={taskModuleInfo.taskRequire} />
                {taskModuleInfo.taskStudentModuleList.map((element, index) => renderCard(element, index))}
                <div style={{ height: "60px", backgroundColor: "#f9f9f9" }}></div>
            </div>
            }
        </Spin>)
    }
}