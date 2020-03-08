import React from 'react'
import { ListView, Badge, SegmentedControl } from 'antd-mobile'
import TopNav from '../../components/nav'
import SubjectNav from '../../components/nav/subject'
import { convertTaskType, formatDate1, formatDate2, isNull,getUserID } from '../../utils/utils'
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
        this.getTaskInfo();
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
            height: document.documentElement.clientHeight * 3 / 4,
        }
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
        this.props.dispatch({
            type: "task/getTaskList",
            payload: {
                studentId: studentid,
                taskFinishStatus: 0,
                subjectId: 100
            }
        })
    }

    back = () => {
        console.log("click back")
    };

    changeSubject = (e) => {
        console.log(e)
    };

    changeComplete = (e) => {
        console.log(e)
    }

    onShowDetails = (type,id) => {
        this.props.history.push("/taskcourse?taskNo="+id);
        // switch(type){
        //     case 1:
        //     case "1":

        // }
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
            return (
                <div key={obj.taskNo} className={Styles.task_item} onClick={this.onShowDetails.bind(this,obj.taskType,obj.id)}>
                    <div className={Styles.title}>{obj.taskName}</div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                        <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
                        <div>
                            <Badge text={obj.subjectName.substr(0,1)} />
                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                                <Badge text={convertTaskType(obj.taskType)} size="large" className={Styles.tasktype_badge} />
                                <Badge text={"在线阅"} size="large" className={Styles.gradetype_badge}/>
                                {formatDate1(obj.taskEndTime)}</div>
                            {/* <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div> */}
                        </div>
                        {formatDate2(obj.taskStartTime)}
                    </div>
                </div>
            );
        };

        return (
            <div>
                <TopNav title="提分任务" onLeftClick={this.back}></TopNav>
                <SubjectNav onchange={this.changeSubject}></SubjectNav>
                <SegmentedControl selectedIndex={0} values={["待完成", "已完成"]} onchange={this.changeComplete} />
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