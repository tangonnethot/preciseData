import React from 'react'
import { Modal } from 'antd-mobile'
import { Empty } from 'antd';
import TopNav from '../../components/nav' 
import Styles from './index.less'
import { connect } from 'dva'
import classnames from 'classnames';
import { parseSearch } from "../../utils/utils"

const prompt = Modal.prompt;
@connect(({ task }) => ({ task }))
export default class TaskmarkingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      studentModuleId: '',
      type: '',
      allScoreInfo: {
        moduleType: "",
        taskStudentModuleId: "",
        studentTopics: []
      },
      height: document.documentElement.clientHeight * 3 / 4,
    }

  }


  componentDidMount() {
    let params = parseSearch()
    let typeParams
    if (params.answerStatus === "3") {
      typeParams = 3
    } else {
      typeParams = 1
    }
    params !== "undefined" && params.studentModuleId !== "undefined" && typeParams && this.props.dispatch({
      type: "taskView/getStudentAnswerDetails",
      payload: {
        studentModuleId: params.studentModuleId,
        type: typeParams
      }
    }).then(() => {
      const { answerDetailsInfo } = this.props.taskView
      const { allScoreInfo } = this.state
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
    })
    if (params !== "undefined" && params.fromPage == 1) {
      const { gradesInfo } = this.props.taskDetails
      this.props.dispatch({ type: "taskDetails/getGradesDetail", payload: { taskClassId: params.taskClassId } }).then(() => {
        gradesInfo && gradesInfo.studentDetails.length > 0 && this.setState({ studentDetails: gradesInfo.studentDetails })
      })
    }
    if (params !== "undefined" && params.fromPage == 2) {
      const { moduleTabItemsInfo } = this.props.taskView
      this.props.dispatch({
        type: "taskView/getModulesByContentId",
        payload: {
          contentId: params.contentId
        }
      }).then(() => {
        moduleTabItemsInfo && moduleTabItemsInfo.studentDetails.length > 0 && this.setState({ studentDetails: moduleTabItemsInfo.studentDetails })
      })
    }
  }

  handleChangeGetScore = (index, e) => {
    const { allScoreInfo } = this.state
    let newArr = { ...allScoreInfo }
    newArr.studentTopics[index].answerScore = e.target.value
    this.setState({
      allScoreInfo: newArr
    })
  }
  handleChangeScore = (index, value) => {
    const { allScoreInfo } = this.state
    let newArr = { ...allScoreInfo }
    newArr.studentTopics[index].answerScore = value
    this.setState({
      allScoreInfo: newArr
    })
  }
  addNumBtn = (index) => {
    const { allScoreInfo } = this.state
    let newArr = { ...allScoreInfo }
    newArr.studentTopics[index].answerScore = newArr.studentTopics[index].answerScore + 0.5
    this.setState({
      allScoreInfo: newArr
    })
  }




  back = () => {
    window.history.go(-1)
  };

  handleClickSaveBtn = () => {
    const { allScoreInfo } = this.state
    this.props.dispatch({
      type: "taskView/manualExaminesTopic",
      payload: allScoreInfo
    })
  }


  render() {

    return (
      <div className={Styles.taskmarkingDetailContainer}>
        <TopNav title="批阅任务" onLeftClick={this.back}></TopNav>
        <div className={Styles.topicNum}>
          <div className={Styles.topicNumInfo}>
            <span className={Styles.topicNumInfoL}>待批阅题目2道，总分100分</span>
            <span className={Styles.topicNumInfoR}>互阅任务</span>
          </div>
          <div className={Styles.topicNumber}>
            <div className={Styles.li}>1</div>
            <div className={Styles.li}>2</div>
            <div className={Styles.li}>3</div>
            <div className={Styles.li}>4</div>
          </div>
        </div>
        <div className={Styles.topicDetail}>
          <div>题目详情</div>
          <div className={Styles.readQuestions}>
            <div className={classnames(Styles.item, Styles.info)}>当前得分：0/6</div>
            <div className={classnames(Styles.item, Styles.yes)}><span></span>答对了</div>
            <div className={classnames(Styles.item, Styles.no)}><span></span>答错了</div>
            <div className={classnames(Styles.item, Styles.part)}
              onClick={() => prompt('部分答对得分', '',
                [
                  {
                    text: '取消',
                  },
                  {
                    text: '确定',
                    onPress: value => console.log(value)

                  },
                ], 'default', null, ['请输入分值，最小单位0.5分'])}><span></span>部分对了</div>
          </div>
        </div>
        <div className={Styles.finishMarking}>完成批阅</div>
      </div>
    )
  }
}