import React from 'react'
import { ListView, SegmentedControl, Toast } from 'antd-mobile'
import { Empty } from 'antd'
import TopNav from '../../components/nav'
import SubjectNav from '../../components/nav/subject'
import { convertTaskType, formatDate1, formatDate2, isNull, getUserID,isTimeArrived } from '../../utils/utils'
import { goHome } from '../../utils/andriod'
import CONSTANT from '../../utils/constant'
import Styles from './index.less'
import { connect } from 'dva'
import classnames from 'classnames';
import { Link } from 'dva/router';
@connect(({ task }) => ({ task }))
export default class taskInfo extends React.Component {
    constructor(props) {
        super(props);
        this.cleanData();
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
        this.props.dispatch({
            type:"task/cleanTaskData"
        })
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

    cleanData = () => {
        this.props.dispatch({
            type: "task/cleanTaskData"
        });
    }

    getTaskInfo = () => {
        let studentid = getUserID();
        let finishStatus = this.state.taskFinishStatus || "0";
        let subjectid = this.state.selSubject || "";
        if (subjectid == 0) subjectid = "";
        // alert("getTaskInfo");
        console.log(this.state.curPage);
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
        this.cleanData();
        this.setState({
            selSubject:subjectid,
            curPage:1
        },()=>{
            this.getTaskInfo();
        })
    };

    changeComplete = (e) => {
        this.cleanData();
        this.setState({
            taskFinishStatus:e.nativeEvent.selectedSegmentIndex,
            curPage:1
        },()=>{
            this.getTaskInfo();
        })
    }

    onShowDetails = (type, status, id,showTime) => {
        if (status >= 1 && (type != 1 || type != "1") && (type != 5 || type != "5")){
            if(isTimeArrived(showTime))
                this.props.history.push("/taskresult?taskNo=" + id);
            else{
                Toast.info("未到答案公布时间，请耐心等待");
            }
        }
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


    onEndReached = (page, lastpage) => {
        this.state.curPage++;
        this.getTaskInfo(false);
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
                <div key={obj.taskNo} className={Styles.task_item} onClick={this.onShowDetails.bind(this, obj.taskType, obj.taskFinishStatus, obj.id,obj.taskAnswerDisplayTime)}>
                    <div>
                        <span className={classnames(Styles.subject,Styles['subject_'+obj.subjectId])}>
                            {obj.subjectName&&obj.subjectName.length>0&&obj.subjectName.charAt(0)}
                        </span>
                        <span className={Styles.title}>{obj.taskName.length < 25 ? obj.taskName : obj.taskName.substring(0,25)+'...'}</span>
                        <span className={Styles.endTime}>{formatDate1(obj.taskStartTime)}</span>
                    </div>
                    <div style={{ paddingLeft: "5.4rem" }}>
                        <span className={classnames(Styles.label, Styles.task_label)}>{convertTaskType(obj.taskType)}</span>
                        <span className={classnames(Styles.label, Styles.review_label)}>{CONSTANT.taskCorrectStartegy[obj.taskCorrectStrategy]}</span>
                        <span className={Styles.startTime}>截止日期： <span>{formatEndTime.date.substring(0,4) === '2099' ? '无' : formatEndTime.date}</span>
                            <span style={{ paddingLeft: "1rem" }}>{formatEndTime.date.substring(0,4) === '2099' ? '' : formatEndTime.time}</span></span>
                    </div>
                </div>
            );
        };

        const { taskFinishStatus} = this.state;
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