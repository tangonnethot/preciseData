import React from 'react'
import { ListView, SegmentedControl } from 'antd-mobile'
import { Empty } from 'antd'
import TopNav from '../../components/nav'
import SubjectNav from '../../components/nav/subject'
import { convertTaskType, formatDate1, formatDate2, isNull, getUserID } from '../../utils/utils'
import { goHome } from '../../utils/andriod'
import Styles from './index.less'
import { connect } from 'dva'
import classnames from 'classnames';
import { Link } from 'dva/router';

@connect(({ task }) => ({ task }))
export default class taskInfo extends React.Component {
    constructor(props) {
        super(props);
        this.cleanModalData();
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        this.state = {
            curPage: 1,
            dataSource,
            taskFinishStatus: 0,
            selSubject: 0,
            height: document.documentElement.clientHeight * 3 / 4,
            showMarqueeIndex: 0
        }
        this.getTaskInfo();
    }

    initMarqueeIndex = () => {
        const { markingCount } = this.props.task;
        if (markingCount.unCorrectTasks && markingCount.unReadNotices) {
            this.setState({
                showMarqueeIndex: !this.state.showMarqueeIndex
            })
        }
        if (markingCount.unCorrectTasks && !markingCount.unReadNotices) {
            this.setState({
                showMarqueeIndex: 0
            })
        }
        if (!markingCount.unCorrectTasks && markingCount.unReadNotices) {
            this.setState({
                showMarqueeIndex: 1
            })
        }
    }

    componentDidMount = () => {
        setInterval(() => {
            this.initMarqueeIndex();
        }, 10000)
    }

    cleanModalData = () => {
        this.props.dispatch({
            type: "task/cleanTaskData"
        });
    }

    getTaskInfo = () => {
        let studentid = getUserID();
        let finishStatus = this.state.taskFinishStatus || "0";
        let subjectid = this.state.selSubject || "";
        if (subjectid == 0) subjectid = "";
        this.props.dispatch({
            type: "task/getTaskList",
            payload: {
                studentId: studentid,
                taskFinishStatus: finishStatus,
                subjectId: subjectid,
                currentPage: this.state.curPage,
                pageSize: 10
            }
        });
        this.props.dispatch({
            type: 'task/getMarkingCount',
            payload: {
                userId: getUserID()
            }
        })
    }

    back = () => {
        goHome();
    };

    changeSubject = (subjectid) => {
        this.state.selSubject = subjectid;
        this.getTaskInfo();
    };

    changeComplete = (e) => {
        this.state.taskFinishStatus = e.nativeEvent.selectedSegmentIndex;
        this.getTaskInfo();
    }

    onShowDetails = (type, status, id) => {
        if (status > 1 && (type != 1 || type != "1") && (type != 5 || type != "5"))
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
        }
    }

    onEndReached = (page, lastpage) => {
        this.state.curPage++;
        this.getTaskInfo();
    }

    isShowMarqueeItem = (index) => {
        const { markingCount } = this.props.task;

        if (markingCount.unCorrectTasks && markingCount.unReadNotices)
            return this.state.showMarqueeIndex == index;
        if (!markingCount.unCorrectTasks && !markingCount.unReadNotices)
            return false;
        if (markingCount.unCorrectTasks && index == 0) return true;
        if (markingCount.unReadNotices && index != 0) return true;
        return false;
    }

    render() {
        const { taskList, markingCount, taskListLoading, taskListPageInfo } = this.props.task;
        let index = 0;

        const row = (item) => {
            if (index > taskList.length - 1) {
                return (<div />)
            }
            const obj = taskList[index++];
            if (isNull(obj)) return (<div></div>);
            let formatEndTime = formatDate2(obj.taskEndTime);

            return (
                <div key={obj.taskNo} className={Styles.task_item} onClick={this.onShowDetails.bind(this, obj.taskType, obj.taskFinishStatus, obj.id)}>
                    <div>
                        <img style={{ width: "45px" }} src={this.getSubjectimg(obj.subjectId)} alt="" />
                        <span className={Styles.title}>{obj.taskName}</span>
                        <span className={Styles.endTime}>{formatDate1(obj.taskStartTime)}</span>
                    </div>
                    <div style={{ paddingLeft: "54px" }}>
                        <span className={classnames(Styles.label, Styles.task_label)}>{convertTaskType(obj.taskType)}</span>
                        <span className={classnames(Styles.label, Styles.review_label)}>在线阅</span>
                        <span className={Styles.startTime}>截止日期： <span>{formatEndTime.date}</span>
                            <span style={{ paddingLeft: "10px" }}>{formatEndTime.time}</span></span>
                    </div>
                </div>
            );
        };

        const { taskFinishStatus, selSubject } = this.state;
        debugger
        return (
            <div className={Styles.taskContainer}>
                <TopNav title="提分任务" onLeftClick={this.back}></TopNav>
                <SubjectNav onChange={this.changeSubject}></SubjectNav>
                <div className={Styles.segment}>
                    <SegmentedControl selectedIndex={taskFinishStatus} values={["待完成", "已完成"]} onChange={this.changeComplete} />
                </div>
                {
                    (markingCount.unCorrectTasks>0||markingCount.unReadNotices>0)&&
                    <div className={Styles.marqueeContainer}>
                        {markingCount.unCorrectTasks == 0 ? "" : 
                        <div className={this.isShowMarqueeItem(0) ? '' : Styles.hidden}>
                            你有新的阅卷任务，赶紧<span className={Styles.red}><Link to="/taskmarking">去批阅</Link></span>吧！
                    </div>}
                        {markingCount.unReadNotices==0?"":
                        <div className={this.isShowMarqueeItem(1) ? '' : Styles.hidden}>
                            你的试卷已被批阅，赶紧<span className={Styles.red}><Link to="/taskbeimarking">去看看</Link></span>吧！</div>
                        }
                    </div>}
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource.cloneWithRows(taskList)}
                    renderRow={row}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    pageSize={10}
                    renderFooter={() => (
                        <div style={{ padding: 30, textAlign: "center" }}>
                            {
                                taskListLoading
                                    ? "数据加载中"
                                    : taskListPageInfo.showMore
                                        ? "上滑加载更多"
                                        : (!isNull(taskList)
                                            ? "已经到底了"
                                            : <Empty description='暂无数据' />)}
                        </div>
                    )}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={200}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
            </div>
        )
    }
}