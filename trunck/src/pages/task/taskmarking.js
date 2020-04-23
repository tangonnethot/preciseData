import React from 'react';
import { WhiteSpace, ListView, Icon,Toast } from 'antd-mobile';
import { Empty, Spin } from 'antd';
import TopNav from '../../components/nav';
import { convertTaskType, isTimeArrived } from '../../utils/utils';
import CONSTANT from '../../utils/constant';
import Styles from './index.less';
import { connect } from 'dva';
import classnames from 'classnames';
import { markingTaskList } from '../../services/task';

@connect(({ task }) => ({ task }))
export default class Taskmarking extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      isLoading: true,
      type: 0,
      height: document.documentElement.clientHeight,
      dataSource,
      listData: [],
      hasMore: true,
      pageNo: 1,
      loading: true,
    }

  }


  componentDidMount() {
    this.getMarkingTaskList();
  }


  getMarkingTaskList = () => {
    const { type } = this.state;
    const state = this.state;
    markingTaskList({
      type,
      currentPage: state.pageNo,
      pageSize: 10,
    })
      .then(res => {
        var listData = state.listData;
        // const listData =
        //   res.data["currentPage"] === 1
        //     ? res.data.datalist
        //     : state.listData.concat(res["data"]['datalist']);
        listData = listData.concat(res.data.datalist)

        const hasMore = state.pageNo * 10 < res.data["totalCount"];
        this.setState({
          listData: listData,
          dataSource: state.dataSource.cloneWithRows(listData),
          hasMore,
          isLoading: false,
          loading: false
        });
      })
  }

  onEndReached = event => {
    const { isLoading, hasMore, pageNo } = this.state;
    if (isLoading || !hasMore) {
      return;
    }
    this.setState({ isLoading: true, pageNo: pageNo + 1 });
    this.getMarkingTaskList();
  };




  onShowDetails = (type, status, id) => {
    if (status > 0 && (type != 1 || type != "1") && (type != 5 || type != "5"))
      this.props.history.push("/taskresult?taskNo=" + id);
    else {
      switch (type) {
        case 1:
        case "1":
          this.props.history.push("/taskcourse?taskNo=" + id);
          break;
        case 2:
        case "2":
          this.props.history.push("/tasktesting?taskNo=" + id);
          break;
        case 3:
        case "3":
          this.props.history.push("/tasktesting?taskNo=" + id);
          break;
        case 4:
        case "4":
          // this.props.history.push("/taskanswersheet?taskNo=" + id);
          this.props.history.push("/tasktesting?taskNo=" + id);
          break;
        case 5:
        case "5":
          this.props.history.push("/taskreference?taskNo=" + id);
          break;
        default:
          this.props.history.push("/taskcourse?taskNo=" + id);
      }
    }

  }

  markDetail = (e, id, correctorStrategy, showTime) => {
    if (isTimeArrived(showTime))
      this.props.history.push("/taskmarkingDetail?studentModuleId=" + id + '&correctorStrategy=' + correctorStrategy);
    else {
      Toast.info("未到答案公布时间，请耐心等待");
    }

  }


  render() {
    const row = (item, index) => {
      return (
        <div className={Styles.task_item} onClick={e => { this.markDetail(e, item.taskStudentModuleId, item.correctorStrategy, item.taskAnswerDisplayTime) }}>
          <div>
            <span className={classnames(Styles.subject,Styles['subject_'+item.subjectId])}>
              {item.subjectName&&item.subjectName.length>0&&item.subjectName.charAt(0)}
            </span>
            <span className={Styles.title}>{item.taskName}</span>
            <span className={Styles.marking}>批阅<Icon type='right' size='lg' /></span>
          </div>
          <div style={{ paddingLeft: "5.4rem" }}>
            <span className={classnames(Styles.label, Styles.task_label)}>{convertTaskType(item.taskType)}</span>
            <span className={classnames(Styles.label, Styles.review_label)}>{CONSTANT.taskCorrectStartegy[item.correctorStrategy]}</span>
            <span className={Styles.startTime}>截止日期： <span>{item.taskEndTime && (item.taskEndTime.substring(0, 16)).substring(0, 4) === '2099' ? '无' :item.taskEndTime.substring(0, 16) }</span> </span>
          </div>
        </div>
      )
    };
    return (
      <div className={Styles.taskmarkingContainer}>
        <TopNav title="批阅任务"></TopNav>
        <div className={Styles.tasklist}>
          <Spin spinning={this.state.loading} tip='数据加载中'>
            <WhiteSpace size="lg" />
            <ListView
              ref={el => (this.lv = el)}
              dataSource={this.state.dataSource}
              renderFooter={() => (
                <div style={{ padding: 30, textAlign: "center" }}>
                  {this.state.isLoading
                    ? "数据加载中"
                    : this.state.hasMore
                      ? "上滑加载更多"
                      : this.state.dataSource._cachedRowCount > 0
                        ? "已经到底了"
                        : <Empty description='暂无数据' />}
                </div>
              )}
              renderRow={row}
              style={{
                height: this.state.height,
                overflow: "auto",
                color: "#abc"
              }}
              pageSize={10}
              scrollRenderAheadDistance={500}
              scrollEventThrottle={200}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={2}
            />
          </Spin>
        </div>
      </div>
    )
  }
}