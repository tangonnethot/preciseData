import React from 'react'
import { NavBar, Icon, ListView } from 'antd-mobile'
import Styles from './index.less'
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
    data = [
        {
            // img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
            img:"../assets/math.png",
            title: '考点4：集合的补强任务',
            des: '截止时间：2019.11.15.',
            subjectName:"数学",
            taskName: "测试试题任务",
            taskNo: "201976150529372102",
            taskRequire: "任务要求任务要求任务要求任务要求任务要求",
            subjectId:"103",
            taskScene: 1,
            taskScore: 0,
            taskStartTime: "2019-12-12 00:00:00",
            taskStudentModuleVoList: [],
            taskTotalScore: 100,
            taskTotalTime: 0,
            taskType: 2,
            updateTime: "2019-12-12 00:00:00"
        },
        {
            // img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
            title: '考点3：测试集合补强任务',
            des: '截止时间：2019.11.15.',
            subjectName:"语文",
            taskName: "测试试题任务",
            taskNo: "201976150529372102",
            taskRequire: "任务要求任务要求任务要求任务要求任务要求",
            subjectId:"100",
            taskScene: 1,
            taskScore: 0,
            taskStartTime: "2019-10-12 00:00:00",
            taskStudentModuleVoList: [],
            taskTotalScore: 100,
            taskTotalTime: 0,
            taskType: 2,
            updateTime: "2019-12-12 00:00:00"
        },       
    ];

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = this.data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            console.log("rowdata");
            if (index < 0) {
                index = this.data.length - 1;
            }
            const obj = this.data[index--];
            return (
                <div key={rowID} style={{ padding: '0 15px' }}>
                    <div
                        style={{
                            lineHeight: '50px',
                            color: '#888',
                            fontSize: 18,
                            borderBottom: '1px solid #F6F6F6',
                        }}
                    >{obj.title}</div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                        <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
                        <div style={{ lineHeight: 1 }}>
                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
                            {/* <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div> */}
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div>
                <div className={Styles.navbar}>提分任务</div>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderBodyComponent={() => <MyBody />}
                    renderRow={row}
                    renderSeparator={separator}
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