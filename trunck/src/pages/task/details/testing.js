import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import { Toast , Modal } from 'antd-mobile';
import { getPageQuery } from '../../../utils/utils';
import TopNav from '../../../components/nav';
import { TaskDescribe, TaskQuestion } from "../../../components/task";
import { dateFormat , isNull, isTimeArrived } from '../../../utils/utils';
import { submitTask, saveTask } from "../../../services/task";
import Styles from "./testing.less"
import { goHome , releaseAudio } from "../../../utils/andriod";
@connect(({ task }) => ({ task }))
export default class Testing extends React.Component {
    constructor(props) {
        super(props);
        const params = getPageQuery();
        let { taskNo } = params;
        this.state = {
            taskid: taskNo,
            showMask: false,
            exitModalStatus:false
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
        _this.props.dispatch({
            type: "task/fetch/start"
        })
        submitTask({
            id: _this.props.task.moduleContentList[_this.state.taskid].questionModuleInfo.id,
            moduleAnswerTime: time,
            taskStudentTopicList: anserlist
        }).then(function (res) {
            switch(res.code){
                case 200:
                    Toast.success("提交成功", 2, () => {
                        _this.props.dispatch({
                            type: "task/fetch/end"
                        })
                        _this.props.history.replace("/taskresult?taskNo=" + _this.state.taskid)
                    });
                    break;
                case 10001:
                    _this.props.dispatch({
                        type: "task/fetch/end"
                    })
                    Toast.fail('请勿重复提交', 2);
                    break;
                case 10002:
                    _this.props.dispatch({
                        type: "task/fetch/end"
                    })
                    Toast.fail('当前任务已超过教师设置的截止时间，不允许进行提交，您可以联系下教师', 2);
                    break;
                case 10003:
                    _this.props.dispatch({
                        type: "task/fetch/end"
                    })
                    _this.setState({ showMask: true });
                    break;
                default:
                    _this.props.dispatch({
                        type: "task/fetch/end"
                    })
                    Toast.fail('提交失败，请稍后重试', 2);
            }
          
        })
    }

    saveAnswer = (time, answerlist) => {
        let _this = this;
        _this.props.dispatch({
            type: "task/fetch/start"
        })
        saveTask({
            id: _this.props.task.moduleContentList[_this.state.taskid].questionModuleInfo.id,
            moduleAnswerTime: time,
            taskStudentTopicList: answerlist
        }).then(function (res) {
            if (res.code == 200) {
                Toast.success("保存成功", 2, () => { 
                    _this.props.dispatch({
                        type: "task/fetch/end"
                    })
                    _this.props.history.replace("/task") }
                );
            } else {
                _this.props.dispatch({
                    type: "task/fetch/end"
                })
                Toast.fail('保存失败，请稍后重试', 2);
            }
        })
    }
    back = ()=>{
        this.changeExitStatus();
    }
    exit = () => {
        if( this.props.history && this.props.history.length == 1 ){
            goHome();
        }else{
            this.props.history.replace("/task")
        }
    }
    onRef=ref=>{
        this.child=ref;
    }
    componentWillUnmount(){
        releaseAudio();
    }
    changeExitStatus = () => {
        this.setState({
            'exitModalStatus': !this.state['exitModalStatus'],
        });
    }
    render() {
        const { loading } = this.props.task;
        if (!this.props.task.moduleContentList[this.state.taskid])
            return (<Spin  tip="数据加载中" ></Spin>)
        const { questionModuleInfo } = this.props.task.moduleContentList[this.state.taskid];
        const showTime = dateFormat(questionModuleInfo.answerDisplayTime,'yyyy.MM.dd hh:mm');
        return (<Fragment>
            {this.state.showMask && <Fragment><div className={Styles.layout_mask} />
                <div className={Styles.img_container}>
                    <img className={Styles.answer_close} onClick={() => {this.setState({ showMask: false }); window.history.go(-1); }} src={require("../../../assets/closedialog.png")} />
                    <img className={Styles.answer_pic} src={require("../../../assets/startAnswer.png")} />
                    <div className={Styles.publish_time}>答案公布时间：{showTime}</div>
                   <div className={Styles.msg}>提交成功，但未到教师设置的答案公布时间，请耐心等待！</div>
                </div>
               
            </Fragment>}
            <Spin spinning={loading}  tip="数据加载中" >
                {isNull(questionModuleInfo) ? <div /> : <div>
                    <TopNav title={questionModuleInfo.moduleName} onLeftClick={this.back}></TopNav>
                    <TaskDescribe endtime={questionModuleInfo.taskEndTime} describe={questionModuleInfo.taskRequire} question={questionModuleInfo.questionContent.testPaperTop} />
                    <TaskQuestion 
                        onRef={this.onRef} 
                        moduleID={this.state.taskid} 
                        taskType={"testing"} 
                        complete={this.answerComplete.bind(this)} 
                        saveAnswer={this.saveAnswer.bind(this)}></TaskQuestion>
                </div>}
            </Spin>
            <Modal
                visible={this.state.exitModalStatus}
                transparent
                onClose={()=>this.changeExitStatus()}
                title="退出"
                footer={[{text:'不保存',onPress:()=>this.exit()},{ text: '保存并退出', onPress: () => this.child.onSave() }]}
                >是否保存当前作答？
            </Modal>
        </Fragment>
        )
    }
}