import React from 'react';
import { WhiteSpace, ListView, Icon } from 'antd-mobile';
import { Empty } from 'antd';
import TopNav from '../../components/nav';
import { convertTaskType } from '../../utils/utils';
import CONSTANT from '../../utils/constant';
import Styles from './index.less';
import { connect } from 'dva';
import classnames from 'classnames';
import { markingTaskList } from '../../services/task';

@connect(({ task }) => ({ task }))
export default class Taskbeimarking extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      isLoading: true,
      type: 2,
      height: document.documentElement.clientHeight,
      dataSource,
      listData: [],
      hasMore: true,
      pageNo: 1,
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
      pageSize: CONSTANT.PAGE_SIZE,
    })
      .then(res => {
        const listData =
          res.data["currentPage"] === 1
            ? res.data.datalist
            : state.listData.concat(res["data"]['datalist']);
        const hasMore = state.pageNo * 10 < res.data["totalCount"];
        this.setState({
          listData: listData,
          dataSource: state.dataSource.cloneWithRows(listData),
          hasMore,
          isLoading: false,
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


  back = () => {
    window.history.go(-1)
  };

  taskDetail = (e, type, status, id) => {
    if (status >= 1 && (type !== 1 || type !== "1"))
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
          this.props.history.push("/tasktesting?taskNo=" + id);
          break;
        default:
          this.props.history.push("/taskcourse?taskNo=" + id);
      }
    }


  }

  getSubjectimg = (id) => {
    switch (id) {
      case 100:
      case "100":
        return require("../../assets/chi.png");
      case 103:
      case "103":
        return require("../../assets/math.png");
      case 104:
      case "104":
        return require("../../assets/eng.png");
      case 105:
      case "105":
        return require("../../assets/politics.png");
      case 106:
      case "106":
        return require("../../assets/math.png");
      case 107:
      case "107":
        return require("../../assets/chem.png");
      case 165:
      case "165":
        return require("../../assets/math.png");
      case 166:
      case "166":
        return require("../../assets/math.png");
      case 265:
      case "265":
        return require("../../assets/history.png");
      default:
        return require("../../assets/chi.png");
    }
  }

  render() {
    const row = (item, index) => {
      return (
        <div className={Styles.task_item} onClick={e => { this.taskDetail(e, item.taskType, item.taskFinishStatus, item.taskStudentId) }}>
          <div>
            <img style={{ width: "4.5rem" }} src={this.getSubjectimg(item.subjectId)} alt="" />
            <span className={Styles.title}>{item.taskName}</span>
            <span className={Styles.marking}><span>批阅</span><span><Icon type='right' size='lg' /></span></span>
          </div>
          <div style={{ paddingLeft: "5.4rem" }}>
            <span className={classnames(Styles.label, Styles.task_label)}>{convertTaskType(item.taskType)}</span>
            <span className={classnames(Styles.label, Styles.review_label)}>{CONSTANT.taskCorrectStartegy[item.correctorStrategy]}</span>
            <span className={Styles.startTime}>截止日期： <span>{item.taskEndTime}</span> </span>
          </div>
        </div>
      )
    };
    return (
      <div className={Styles.taskmarkingContainer}>
        <TopNav title="被批阅任务" onLeftClick={this.back}></TopNav>
        <div className={Styles.tasklist}>
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
        </div>
      </div>
    )
  }
}