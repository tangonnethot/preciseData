import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import { Toast } from 'antd-mobile';
import { getPageQuery } from '../../../utils/utils';
import TopNav from '../../../components/nav';
import { TaskDescribe, TaskQuestion } from "../../../components/task";
import { formatDate2, isNull, isTimeArrived } from '../../../utils/utils';
import { submitTask, saveTask } from "../../../services/task";
import Styles from "./testing.less"
@connect(({ task }) => ({ task }))
export default class Testing extends React.Component {
    constructor(props) {
        super(props);
        const params = getPageQuery();
        let { taskNo } = params;
        this.state = {
            taskid: taskNo,
            showMask: false
        }
        this.getQuestionTaskDetail(taskNo);
    }

    getQuestionTaskDetail = (taskid) => {
        this.props.dispatch({
            type: "task/getQuestionTaskDetail",
            payload: {
                taskStudentId: taskid
            }
        })
    }

    answerComplete = (time, anserlist) => {        
        let _this = this;
        submitTask({
            id: _this.props.task.moduleContentList[_this.state.taskid].questionModuleInfo.id,
            moduleAnswerTime: time,
            taskStudentTopicList: anserlist
        }).then(function (res) {
            switch(res.code){
                case 200:
                    Toast.success("提交成功", 2, () => {
                        let showTime = _this.props.task.moduleContentList[_this.state.taskid].questionModuleInfo.answerDisplayTime;
                        if (!isTimeArrived(showTime)) {
                            _this.setState({ showMask: true });
                            return;
                        }
                        _this.props.history.push("/taskresult?taskNo=" + _this.state.taskid)
                    });
                    break;
                case 10001:
                    Toast.fail('请勿重复提交', 2);
                    break;
                case 10002:
                    Toast.fail('当前任务已超过教师设置的截止时间，不允许进行提交，您可以联系下教师', 2);
                    break;
                case 10003:
                    let showTime = _this.props.task.moduleContentList[_this.state.taskid].questionModuleInfo.answerDisplayTime;
                    if (!isTimeArrived(showTime)) {
                        _this.setState({ showMask: true });
                        return;
                    }
                    break;
                default:
                    Toast.fail('提交失败，请稍后重试', 2);
            }
          
        })
    }

    saveAnswer = (time, answerlist) => {
        let _this = this;
        saveTask({
            id: _this.props.task.moduleContentList[_this.state.taskid].questionModuleInfo.id,
            moduleAnswerTime: time,
            taskStudentTopicList: answerlist
        }).then(function (res) {
            if (res.code == 200) {
                Toast.success("保存成功", 2, () => { _this.props.history.push("/task") });
            } else {
                Toast.fail('保存失败，请稍后重试', 2);
            }
        })
    }

    render() {
        const { loading } = this.props.task;
        if (!this.props.task.moduleContentList[this.state.taskid])
            return (<Spin></Spin>)
        const { questionModuleInfo } = this.props.task.moduleContentList[this.state.taskid];
        const showTime = formatDate2(questionModuleInfo.answerDisplayTime);
        return (<Fragment>
            {this.state.showMask && <Fragment><div className={Styles.layout_mask} />
                <div className={Styles.img_container}>
                    <img className={Styles.answer_close} onClick={() => {this.setState({ showMask: false }); this.props.history.push("/task") }} src={require("../../../assets/closedialog.png")} />
                    <img className={Styles.answer_pic} src={require("../../../assets/startAnswer.png")} />
                    <div className={Styles.publish_time}>答案公布时间：{showTime.date+" "+showTime.time}</div>
                   <div className={Styles.msg}>提交成功，但未到教师设置的答案公布时间，请耐心等待！</div>
                </div>
               
            </Fragment>}
            <Spin spinning={loading}>
                {isNull(questionModuleInfo) ? <div /> : <div>
                    <TopNav title={questionModuleInfo.moduleName} onLeftClick={this.back}></TopNav>
                    <TaskDescribe endtime={formatDate2(questionModuleInfo.taskEndTime)} describe={questionModuleInfo.taskRequire} question={questionModuleInfo.questionContent.testPaperTop} />
                    <TaskQuestion moduleID={this.state.taskid} taskType={"testing"} complete={this.answerComplete.bind(this)} saveAnswer={this.saveAnswer.bind(this)}></TaskQuestion>
                </div>}
            </Spin>
        </Fragment>
        )
    }
}