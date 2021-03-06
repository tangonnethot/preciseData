import React from 'react'
import { Card, Toast , Modal} from 'antd-mobile'
import { Spin, Button } from 'antd'
import { getPageQuery } from '../../../utils/utils'
import { connect } from 'dva';
import TopNav from '../../../components/nav';
import { TaskDescribe, TaskRef, TaskQuestion, TaskResult } from "../../../components/task";
import { isNull, getUserID, startTime } from '../../../utils/utils';
import Styles from './course.less';
import { submitTask, saveTask } from "../../../services/task"
import { goHome , releaseAudio } from "../../../utils/andriod";

@connect(({ task }) => ({ task }))
export default class CourseDetails extends React.Component {
    constructor(props) {
        super(props);
        const params = getPageQuery();
        let { taskNo } = params;
        this.getCourseDetail(taskNo);
        this.state = {
            expandIndex: -1,
            exitModalStatus:false
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

    refComplete = (id,time) => {
        let _this = this;
        submitTask({
            id: id,
            // id:"d92a468cd49d4e8ca86193a658047c10",
            moduleAnswerTime: time,
            taskStudentTopicList: []
        }).then(function (res) {
            if (res.code == 200) {
                Toast.success("提交成功", 2);
                window.location.reload();
                // _this.setState({
                //     expandIndex: -1
                // })
            } else {
                Toast.fail('提交失败，请稍后重试', 2);
            }
        })
    }

    expand = (index) => {
        this.setState({
            expandIndex: index
        })
        startTime();
    }

    reduceCard = () => {
        this.setState({
            expandIndex: -1
        })
    }

    answerComplete = (id, time, anserlist) => {
        let _this = this;
        submitTask({
            id: id,
            moduleAnswerTime: time,
            taskStudentTopicList: anserlist
        }).then(function (res) {
            switch(res.code){
                case 200:
                    Toast.success("提交成功", 2,()=>{
                        window.location.reload();
                    });
                    break;
                case 10001:
                    Toast.fail('请勿重复提交', 2);
                    break;
                case 10002:
                    Toast.fail('当前任务已超过教师设置的截止时间，不允许进行提交，您可以联系下教师', 2);
                    break;
                case 10003:
                    Toast.fail('答案未到显示时间', 2,()=>{
                        window.location.reload();
                    });
                    break;
                default:
                    Toast.fail('提交失败，请稍后重试', 2);
            }        
        })
    }

    saveAnswer = (id, time, answerlist) => {
        let _this = this;
        saveTask({
            id: id,
            moduleAnswerTime: time,
            taskStudentTopicList: answerlist
        }).then(function (res) {
            if (res.code == 200) {
                Toast.success("提交成功", 2,()=>{
                    _this.setState({
                        expandIndex: -1
                    });
                    if( _this.state.exitStatus ) _this.exit();
                });
            } else {
                Toast.fail('提交失败，请稍后重试', 2);
                if( _this.state.exitStatus ) _this.setState({
                    exitStatus:false
                });
            }
        })
    }
    back = ()=>{
        if( this.state.expandIndex == -1 ){
            this.exit();
        }else{
            if( this.props.task.taskModuleInfo.taskStudentModuleList[this.state.expandIndex].moduleType == 1 ){
                this.exit();    
            }else{
                this.changeExitStatus();
            }
        }
    }
    exit = () => {
        if( this.props.history && this.props.history.length == 1 ){
            goHome();
        }else{
            this.props.history.replace("/task")
        }
    }
    onRef=(ref,key)=>{
        this[key]=ref;
    }
    componentWillUnmount(){
        releaseAudio();
    }
    changeExitStatus = () => {
        this.setState({
            'exitModalStatus': !this.state['exitModalStatus']
        });
    }
    render() {
        const { taskModuleInfo, loading } = this.props.task;
        const renderCard = (element, idx) => {
            if (element.moduleType == 1) {
                return <div className={Styles.card_container} Style={idx == this.state.expandIndex ? "height:auto" : ""} ><Card full="true">
                    <Card.Header title={element.moduleName}
                        extra={element.answerStatus == 0 ? <Button type="primary" onClick={this.expand.bind(this, idx)}>开始学习</Button> : <Button type="primary" onClick={this.expand.bind(this, idx)}>查看学习资料</Button>} />
                    <Card.Body>
                        <TaskRef isCourse={true} moduleID={element.id} complete={this.refComplete.bind(this,element.id)}></TaskRef>
                        {element.answerStatus > 0 ? <div className={Styles.btn_container}>
                            <Button className={Styles.complete_btn} onClick={this.reduceCard}>完成学习</Button>
                        </div> : <div />}
                    </Card.Body>
                </Card>
                </div>
            }
            if (element.moduleType == 2) {
                if (element.answerStatus == 0 || element.answerStatus == 1) {
                    return <div className={Styles.card_container} key={element.id} Style={idx == this.state.expandIndex ? "height:auto" : ""}><Card full="true">
                        <Card.Header title={element.moduleName}
                            extra={<Button type="primary" onClick={this.expand.bind(this, idx)}>开始做答</Button>} />
                        <Card.Body>
                            <TaskQuestion 
                                onRef={(ref)=>this.onRef(ref,`child${idx}`)} 
                                taskType={"course"} 
                                moduleID={element.id} 
                                complete={this.answerComplete.bind(this, element.id)} 
                                saveAnswer={this.saveAnswer.bind(this, element.id)}></TaskQuestion>
                        </Card.Body>
                    </Card></div>
                } else {
                    return <div className={Styles.card_container} key={element.id} Style={idx == this.state.expandIndex ? "height:auto" : ""}><Card full="true">
                        <Card.Header title={element.moduleName}
                            extra={<Button type="primary" onClick={this.expand.bind(this, idx)}>查看做答结果</Button>} />
                        <Card.Body>
                            <TaskResult taskType={"course"} moduleID={element.id} footer={true}></TaskResult>
                            <div className={Styles.btn_container}>
                                <Button className={Styles.complete_btn} onClick={this.reduceCard}>完成学习</Button>
                            </div>
                        </Card.Body>
                    </Card></div>
                }

            }
        }
        return (<Spin spinning={loading}  tip="数据加载中" >
            {isNull(taskModuleInfo) ? <div /> : <div clasNam={Styles.course_container}>
                <TopNav title={taskModuleInfo.taskName} onLeftClick={this.back}></TopNav>
                <TaskDescribe endtime={taskModuleInfo.taskEndTime} describe={taskModuleInfo.taskRequire} />
                {taskModuleInfo.taskStudentModuleList.map((element, index) => renderCard(element, index))}
                <div style={{ height: "6rem", backgroundColor: "#f9f9f9" }}></div>
                <Modal
                    visible={this.state.exitModalStatus}
                    transparent
                    onClose={()=>this.changeExitStatus()}
                    title="退出"
                    footer={[{text:'不保存',onPress:()=>this.exit()},{ text: '保存并退出', onPress: () => {
                        this.setState({
                            exitStatus:true
                        })
                        this[`child${this.state.expandIndex}`].onSave()
                    } }]}
                    >是否保存当前作答？
                </Modal>
            </div>
            }
        </Spin>)
    }
}