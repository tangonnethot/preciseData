import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import { getPageQuery, formatDate2, isNull } from '../../../utils/utils';
import TopNav from '../../../components/nav';
import { TaskResult } from "../../../components/task";
import Styles from './answer.less';
import classnames from 'classnames';

class AnswerResult extends React.Component {
  constructor(props) {
    super(props);
    const params = getPageQuery();
    let { taskNo } = params;
    this.state = {
      taskid: taskNo
    }
    this.getQuestionTaskDetail(taskNo);
  }

  getQuestionTaskDetail = (taskid) => {
    this.props.dispatch({
      type: "task/getQuestionTaskDetail",
      payload: {
        // taskStudentId: "59c3611d88184832a0327c285c790add",
        taskStudentId: taskid,
      }
    })
  }
  back =(e) => {
    this.props.history.push("/task");
  }


  render() {
    const { loading } = this.props.task;
    if (!this.props.task.moduleContentList[this.state.taskid])
      return (<Spin></Spin>);

    const { questionModuleInfo } = this.props.task.moduleContentList[this.state.taskid];
    const { answerList } = this.props.task.moduleContentList[this.state.taskid];

    const renderNumberItem = (item, index) => {

      return (item.examinesState!=2 ? <div className={Styles.item_number} >{index + 1}</div> :
        item.isRight ?
          <div className={classnames(Styles.item_number, Styles.green)} >{index + 1}</div> :
          <div className={classnames(Styles.item_number, Styles.red)} >{index + 1}</div>
      )
    }
    let formatEndtime = formatDate2(questionModuleInfo.taskEndTime);
    let finishEndtime = formatDate2(questionModuleInfo.moduleFinishTime);
    let reviewtime = formatDate2(questionModuleInfo.updateTime);
    return (
      isNull(questionModuleInfo) ? <div /> :
        <div>
          <TopNav title={questionModuleInfo.moduleName} onLeftClick={e=>this.back(e)}></TopNav>
          <div>
            <div className={Styles.blue_container}>
            </div>
            <div className={Styles.container}>
              <img className={Styles.bg} src={require("../../../assets/resultScore.png")}></img>
              <div className={Styles.scoringRate} >得分率：{questionModuleInfo.moduleScore == 0 ? 0 : (questionModuleInfo.score/questionModuleInfo.moduleScore).toFixed(2)}%</div>
              <div className={Styles.scoring} >{questionModuleInfo.score}分</div>
              <div className={Styles.number}>满分：{questionModuleInfo.moduleScore}分</div>
              <div className={Styles.time_container}>
                答题时间：
                {finishEndtime.date}&nbsp;
                {finishEndtime.time}
              </div>
              <div className={Styles.time_container}>
                 截止时间： 
               {formatEndtime.date.substring(0,4) === '2099' ? '无': formatEndtime.date} &nbsp;
                {formatEndtime.date.substring(0,4) === '2099' ? '': formatEndtime.time} 
                </div>
    <div style={{ marginTop: "2.8rem", fontSize: "@content-big-font-size" }}><span>阅卷人：</span><span>{console.log(questionModuleInfo)}{questionModuleInfo.moduleCorrectorName}</span>
                <span className={Styles.paddingLeft20}>阅卷时间：</span><span>{reviewtime.date}</span><span className={Styles.paddingLeft10}>{reviewtime.time}</span></div>
            </div>
            <div className={Styles.border}></div>
            <div className={Styles.statistics}>
              <div className={Styles.title}>{questionModuleInfo.questionContent.testPaperTop}</div>
              <div>{
                answerList.map((element, idx) => renderNumberItem(element, idx))
              }</div>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <TaskResult moduleID={this.state.taskid}></TaskResult>
          </div>
          {/* <TaskDescribe endtime={formatDate2(questionModuleInfo.taskEndTime)} describe={questionModuleInfo.taskRequire} /> */}
          {/* <TaskQuestion taskType={"testing"} complete={this.refComplete}></TaskQuestion> */}
        </div>

    )
  }
}

export default connect(({ task }) => ({ task: task }))(AnswerResult)
