import React from 'react'
import { ListView, Badge, SegmentedControl } from 'antd-mobile'
import TopNav from '../../components/nav'
import SubjectNav from '../../components/nav/subject'
import { convertTaskType, formatDate1, formatDate2, isNull, getUserID } from '../../utils/utils'
import { goHome } from '../../utils/andriod'
import Styles from './index.less'
import { connect } from 'dva'

function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            {props.children}
        </div>
    );
};

const NUM_SECTIONS = 1;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
        rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
            const rowName = `S${ii}, R${jj}`;
            rowIDs[ii].push(rowName);
            dataBlobs[rowName] = rowName;
        }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
}

@connect(({ task }) => ({ task }))
export default class taskInfo extends React.Component {
    constructor(props) {
        super(props);

        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        this.state = {
            dataSource,
            isLoading: true,
            taskFinishStatus: 0,
            selSubject: 0,
            height: document.documentElement.clientHeight * 3 / 4,
        }
        this.getTaskInfo();

    }

    componentDidMount() {
        const hei = document.documentElement.clientHeight;// - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;

        setTimeout(() => {
            genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
                height: hei,
            });
        }, 600);
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
                subjectId: subjectid
            }
        })
    }

    back = () => {
        goHome();
    };

    changeSubject = (subjectid) => {
        console.log(subjectid)
        this.setState({
            selSubject: subjectid
        })
        this.getTaskInfo();
    };

    changeComplete = (e) => {
        console.log(e.nativeEvent.selectedSegmentIndex)
        this.setState({
            taskFinishStatus: e.nativeEvent.selectedSegmentIndex
        })
        this.getTaskInfo();
    }

    onShowDetails = (type, id) => {
        if (this.state.finishStatus > 0)
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
                    this.props.history.push("/taskanswersheet?taskNo=" + id);
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

    render() {
        const { taskList } = this.props.task;
        let index = taskList.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = taskList.length - 1;
            }
            const obj = taskList[index--];
            if (isNull(obj)) return (<div></div>);
            let formatEndTime = formatDate2(obj.taskEndTime);
            return (
                <div key={obj.taskNo} className={Styles.task_item} onClick={this.onShowDetails.bind(this, obj.taskType, obj.id)}>
                    <div>
                        {/* <Badge text={obj.subjectName.substr(0,1)} /> */}
                        <img style={{width:"35px"}} src={require("../../assets/math.png")} alt="" />
                        <span className={Styles.title}>{obj.taskName}</span>
                        <span className={Styles.endTime}>{formatDate1(obj.taskStartTime)}</span>
                    </div>
                    <div style={{ marginBottom: '10px',paddingLeft:"45px"}}>
                        <Badge text={convertTaskType(obj.taskType)} size="large" className={Styles.tasktype_badge} />
                        <Badge text={"在线阅"} size="large" className={Styles.gradetype_badge} />
                        <span className={Styles.startTime}>截止日期：</span>
                        <span>{formatEndTime.date}</span>
                        <span style={{paddingLeft:"16px"}}>{formatEndTime.time}</span>
                    </div>
                </div>
            );
        };
        const { taskFinishStatus, selSubject } = this.state;
        return (
            <div>
                <TopNav title="提分任务" onLeftClick={this.back}></TopNav>
                <SubjectNav onChange={this.changeSubject}></SubjectNav>
                <div className={Styles.segment}>
                    <SegmentedControl selectedIndex={taskFinishStatus} values={["待完成", "已完成"]} onChange={this.changeComplete} />
                </div>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderBodyComponent={() => <MyBody />}
                    renderRow={row}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    pageSize={4}
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
            </div>
        )
    }
}