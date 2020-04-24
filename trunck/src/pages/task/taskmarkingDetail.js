import React from 'react';
import TopNav from '../../components/nav'; 
import Styles from './index.less';
import { connect } from 'dva';
import CONSTANT from '../../utils/constant';
import { getPageQuery } from "../../utils/utils";
import classnames from 'classnames';
import Taskmarktopic from '../../components/task/taskmarktopic';
import { Toast } from 'antd-mobile';

@connect(({ task }) => ({ task }))
export default class TaskmarkingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      indexAct: 0,
      studentModuleId: '',
      allScoreInfo: {
        moduleType: "",
        taskStudentModuleId: "",
        studentTopics: []
      },
      height: document.documentElement.clientHeight * 3 / 4,
      isSubmit: 1
    }

  }


  componentDidMount() {
    let params = getPageQuery()
    this.props.dispatch({
      type: "task/getMarkingDetails",
      payload: {
        studentModuleId: params.studentModuleId,
        type: 1
      }
    }).then(() => {   
      const { answerDetailsInfo } = this.props.task;
      const { allScoreInfo } = this.state;
      answerDetailsInfo && answerDetailsInfo.topics.length > 0 && answerDetailsInfo.topics.map((item, index) => {
        if (item.type === 1078) {
          allScoreInfo.studentTopics.push({
            answerScore: item.topics[0].answerScore,
            id: item.topics[0].studentTopicId,
            contentTopicId: item.topics[0].taskContentTopicId,
            topicScore: item.topics[0].score,
            topicType: item.topics[0].type,
            parentId: item.topics[0].parentId,
            answerContent: item.topics[0].answerContent,
            topicId: item.topics[0].taskContentTopicId,
            topicTag:item.topics[0].topicTag,
            sort:item.sort,
            studentName:answerDetailsInfo.studentName,
            studentId:answerDetailsInfo.studentId,
          })

        } else {
          allScoreInfo.studentTopics.push({
            answerScore: item.answerScore,
            id: item.studentTopicId,
            contentTopicId: item.taskContentTopicId,
            topicScore: item.score,
            topicType: item.type,
            parentId: item.parentId,
            answerContent: item.answerContent,
            topicId: item.taskContentTopicId,
            topicTag:item.topicTag,
            sort:item.sort,
            studentName:answerDetailsInfo.studentName,
            studentId:answerDetailsInfo.studentId,
          })
        }
        this.setState({ allScoreInfo })
      })
      let newObj = { ...allScoreInfo }
      if (answerDetailsInfo && answerDetailsInfo.moduleType && answerDetailsInfo.taskStudentModuleId) {
        newObj.moduleType = answerDetailsInfo.moduleType
        newObj.taskStudentModuleId = answerDetailsInfo.taskStudentModuleId
        this.setState({ allScoreInfo: newObj })
      } 
      this.isSubmit();
    })
  }


  handleClickSaveBtn = (e) => {
    const { allScoreInfo } = this.state;
    this.props.dispatch({
      type: "task/submitMarking",
      payload: allScoreInfo,
      callback: (res) => {
          if( res.code == 200 ){
            Toast.success('批阅成功',2,()=>{
              this.props.history.replace("/taskmarking");
            })
          }else{
            Toast.fail("提交失败，请稍后重试",2)
          }           
      }
    })
  }

  totalScore = () => {
    const { answerDetailsInfo } = this.props.task;
    let num = 0;
    if (answerDetailsInfo.topics) {
      for (let i = 0; i < answerDetailsInfo.topics.length; i++) {
        if (answerDetailsInfo.topics[i].type === 1078) {
          num += answerDetailsInfo.topics[i].topics[0].score;
        } else {
          num += answerDetailsInfo.topics[i].score;
        }

      }
    }
    return num;
  }

  isSubmit = () => {  
    const { answerDetailsInfo } = this.props.task;
    for (let i = 0; i < answerDetailsInfo.topics.length; i++) {
      if (answerDetailsInfo.topics[i].type === 1078) {
        if (answerDetailsInfo.topics[i].topics[0].examinesState !== 2) {
          this.setState({
            isSubmit: 0
          })
          return;
        }else{
          this.setState({
            isSubmit: 1
          })
        }
      } else {
        if (answerDetailsInfo.topics[i].examinesState !== 2) {
          this.setState({
            isSubmit: 0
          }) 
          return;
        }else{
          this.setState({
            isSubmit: 1
          })
        }
      }

    }
  }

  actIndex = (index, type, score) => {
    const { answerDetailsInfo } = this.props.task;
    if (answerDetailsInfo.topics[index].type === 1078) {
      answerDetailsInfo.topics[index].topics[0].judge = type;
      answerDetailsInfo.topics[index].topics[0].examinesState = 2;
      answerDetailsInfo.topics[index].topics[0].answerScore = score;
    } else {
      answerDetailsInfo.topics[index].judge = type;
      answerDetailsInfo.topics[index].examinesState = 2;
      answerDetailsInfo.topics[index].answerScore = score;
    }
    this.props.dispatch({
      type: 'task/fetchAfter',
      payload: {
        answerDetailsInfo: answerDetailsInfo
      }
    })
    const { allScoreInfo } = this.state
    let newArr = { ...allScoreInfo }
    newArr.studentTopics[index].answerScore = score;
    this.setState({
      allScoreInfo: newArr,
      indexAct: type,
    })
    this.isSubmit();

  }
  back=()=>{
    this.props.history.replace("/taskmarking");
  }
  render() {
    const { answerDetailsInfo } = this.props.task;
    let params = getPageQuery();
    const { isSubmit } = this.state;
    const numColor = (indexAct) => {
      if (indexAct === undefined) {
        return Styles.default;
      } else if (indexAct === 1) {
        return Styles.green;
      } else if (indexAct === 2) {
        return Styles.red;
      }
    }
    const renderNumberItem = (item, index) => {
      if (item.type === 1078) {
        return <div className={classnames(Styles.li, numColor(item.topics[0].judge))}>{index + 1}</div>
      } else {
        return <div className={classnames(Styles.li, numColor(item.judge))}>{index + 1}</div>
      }
    }
    return (
      <div className={Styles.taskmarkingDetailContainer}>
        {answerDetailsInfo && <TopNav title={answerDetailsInfo.moduleName} onLeftClick={this.back}></TopNav>}
        <div className={Styles.topicNum}>
          <div className={Styles.topicNumInfo}>
            <span className={Styles.topicNumInfoL}>待批阅题目{answerDetailsInfo && answerDetailsInfo.topics.length}道，总分{this.totalScore()}分</span>
            <span className={Styles.topicNumInfoR}>{CONSTANT.taskCorrectStartegy[params.correctorStrategy]}</span>
          </div>
          <div className={Styles.topicNumber}>
            {
              answerDetailsInfo && answerDetailsInfo.topics.map((item, index) => renderNumberItem(item, index))
            }
          </div>
        </div>
        <div className={Styles.topicDetail}>
          {
            answerDetailsInfo && answerDetailsInfo.topics.map((item, index) => {
              return <Taskmarktopic key={index} item={item} index={index} actIndex={this.actIndex} />;
            })
          }
        </div>
        {
          isSubmit === 1 ?
            <div className={Styles.finishMarking} onClick={e => this.handleClickSaveBtn(e)}>完成批阅</div>
            :
            <div className={Styles.NOfinishMarking}>完成批阅</div>
        }
      </div>
    )
  }
}