import React, { Fragment } from 'react';
import { Flex, SegmentedControl, Pagination, Icon } from 'antd-mobile';
import { goHome } from '../../utils/andriod';
import { Empty } from 'antd';
import TopNav from '../../components/nav';
import SubjectNav from '../../components/nav/subject';
import Styles from './index.less';
import { getErrorBook } from '../../services/errorBook';
import { ErrorShow } from '../../components/examin/student/index'


export default class errorBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selSubject: '',
      tabType: 0,
      status: 1,
      pageSize: 2,
      pageNo: 1,
      topicArr: [],
      totalCount: '',
      index: 1,
      current:1
    }
  }

  componentDidMount() {
    this.errorBook();
  }


  errorBook = () => {
    const { status, selSubject, pageSize, pageNo } = this.state;
    getErrorBook({
      status,
      subjectId: selSubject,
      pageSize,
      currentPage: pageNo
    })
      .then(res => {
        this.setState({
          topicArr: res.data.datalist,
          totalCount: res.data.totalCount, 
        })
      })
  }

  back = () => {
    goHome();
  };

  changeSubject = (subjectid) => {
    this.setState({
      selSubject: subjectid
    }, () => {
      this.errorBook()
    })
  };

  changeComplete = (e) => {
    this.setState({
      tabType: e.nativeEvent.selectedSegmentIndex
    })
  }

  onChange = (key) => {
    const { pageSize, pageNo } = this.state;
    if (key-1 === pageSize) {
      this.setState({
        pageNo: pageNo + 1,
        index:1
      },()=>{
        this.errorBook();
      })
    }else{
      if ( key == 4 ) key = 2
      this.setState({
        index: key
      })
  
    }
    
  }

  isShow = () => {

  }

  answerScoreList = () => {
    const { topicArr, index } = this.state;
    debugger
    return topicArr[index - 1].ctStuAnswerRecordList.map((item) => {
      let result = {
        answer: item.answerContent,
        score: item.answerScore,
        time: item.answerTime
      };
      return result;
    })
  }

  render() {
    const { tabType, topicArr, totalCount, index, pageNo, current } = this.state;
    return (
      <div className={Styles.errorBookContainer}>
        <TopNav title="错题本" onLeftClick={this.back}></TopNav>
        <SubjectNav onChange={this.changeSubject}></SubjectNav>
        <div className={Styles.segment}>
          {/* <SegmentedControl selectedIndex={tabType} values={["本周错题", "全部错题"]} onChange={this.changeComplete} /> */}
          <SegmentedControl selectedIndex={tabType} values={["本周错题"]} onChange={this.changeComplete} />
        </div>
        {tabType === 0 ?
          <Fragment>
            {topicArr.length > 0 ?
              <Fragment>
                <Flex justify="between" className={Styles.topicNumber}>
                  <div>全部错题：{totalCount}道</div>
                </Flex>
                <div
                  className={Styles.topicCont}
                  style={{ minHeight: document.documentElement.clientHeight - 380 }}
                >
                  <ErrorShow
                    question={topicArr[index - 1]}
                    answerScoreList={this.answerScoreList()}
                  />
                </div>
                <div className={Styles.pagination}>
                  <Pagination
                    total={totalCount}
                    current={pageNo > 1 ? pageNo+current : current  }
                    locale={{
                      prevText: (<span className="arrow-align">上一题</span>),
                      nextText: (<span className="arrow-align">下一题</span>),
                    }}
                    onChange={this.onChange}
                  />
                </div>
              </Fragment>
              : <Empty description='暂无数据' />
            }
          </Fragment>
          :
          <Fragment>
            <Empty description='暂无数据' />
            {/* <Flex justify="between" className={Styles.topicNumber}>
              <div>全部错题：655道</div>
            </Flex>
            <ul>
              <li>
                <span>11111111 <Icon type='down' onClick={this.isShow()} /></span>
                <ul>
                  <li>
                    <span>222222 <Icon type='down' /></span>
                    <ul>
                      <li>333333</li>
                      <li>333333</li>
                      <li>333333</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul> */}
          </Fragment>
        }
      </div>
    )
  }
}