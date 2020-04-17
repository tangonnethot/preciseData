import React from 'react';
import KnowLeadge from '../../components/knowleadge';
import TopNav from '../../components/nav';
import SubjectNav from '../../components/nav/subject';
import { goHome } from '../../utils/andriod';
import { getUserID, getschoolYear,getOrgID,isNull} from "../../utils/utils";
import { Row,Col,Progress,Empty} from "antd";
import { SegmentedControl,Accordion,List} from "antd-mobile";
import ReactEcharts from 'echarts-for-react';
import Styles from './index.less';
import { connect } from 'dva';
class learningSituation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeType: "4",
            selSubjet: "0",
            selView: 0,
            // count: 237
        };
        this.initData();
    }

    initData = () => {
        const { timeType } = this.state;

        this.props.dispatch({
            type: "learningSituation/getComprehensive",
            payload: {
                schoolYear: getschoolYear(),
                studentId: getUserID(),
                timeType: timeType
            }
        });      
    }

    back = () => {
        goHome();
    }

    getColor = () => {
        return ["#32befe", "#d155cb", "#ffde76", "#79fa97", "#05f0d8", "#6873f2", "#fe7c70", "#243db9"];
    }

    changeSubject = (sid) => {
        this.setState({
            selSubjet: sid
        })
        this.props.dispatch({
            type: "learningSituation/getKnowleadgeList",
            payload: {
                schoolYear: getschoolYear(),
                studentId: getUserID(),
                orgId:getOrgID(),
                subjectId:sid,
                timeType: this.state.timeType
            }
        });
        this.props.dispatch({
            type: "learningSituation/getKnowleadgeMap",
            payload: {
                schoolYear: getschoolYear(),
                studentId: getUserID(),
                orgId:getOrgID(),
                subjectId:sid,
                timeType: this.state.timeType
            }
        });
    }

    getTaskNumData = () => {
        let taskNumArray=[];
        this.props.situation.totalStatistics.forEach(element => {
            taskNumArray.push({
                value:element.taskNum,
                name:element.subjectName
            })
        });
       return taskNumArray;
    }

    getTopicCountData=()=>{
        let topicNumArray=[];
        this.props.situation.totalStatistics.forEach(element => {
            topicNumArray.push({
                value:element.topicCount,
                name:element.subjectName
            })
        });
       return topicNumArray;
    }

    getUserTimeData =()=>{
        let userTimeArray=[];
        this.props.situation.totalStatistics.forEach(element => {
            userTimeArray.push({
                value:element.taskTotalTime,
                name:element.subjectName
            })
        });
       return userTimeArray;
    }

    getTaskCountOption = () => {
        return {
            color: this.getColor(),
            series: [
                {
                    name: '任务量',
                    type: 'pie',
                    radius: ['60%', '80%'],
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    data: this.getTaskNumData()
                }
            ]
        }
    }

    getTopicCountOption = () => {
        return {
            color: this.getColor(),
            series: [
                {
                    name: '题量',
                    type: 'pie',
                    radius: ['60%', '80%'],
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    data: this.getTopicCountData()
                }
            ]
        }
    }

    getTimeOption = () => {
        return {
            color: this.getColor(),
            series: [
                {
                    name: '题量',
                    type: 'pie',
                    radius: ['60%', '80%'],
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    data: this.getUserTimeData()
                }
            ]
        }
    }

    getScoreBarData = ()=>{
        let xData=[],seriesData=[];
        this.props.situation.totalStatistics.forEach(element => {
            xData.push(element.subjectName);
            let score = Math.round(element.taskScore/element.taskTotalScore*10000)/100;
            if(isNaN(score)) score =0;
            seriesData.push(score);
        });
       return {
           xData:xData,
           sData:seriesData
       };
    }

    getScoreBarOption = () => {
        let data = this.getScoreBarData();
        return {
            xAxis: {
                type: 'category',
                data: data.xData
            },
            yAxis: {
                type: 'value'
            },
            // renderer:"canvas",
            series: [{
                data: data.sData,
                type: 'bar',
                barWidth: 26,
                itemStyle: {
                    color: function (params) {
                        if (params.value < 60)
                            return "#eb4646";
                        if (params.value < 75)
                            return "#ec7946";
                        if (params.value < 85)
                            return "#d7e047";
                        if (params.value < 95)
                            return "#1dc99a";
                        return "#11a106";
                    }
                }
            }]
        }
    }

    changeSelView = (e) => {
        this.setState({
            selView: e.nativeEvent.selectedSegmentIndex
        });

    }

    // getColumnsData = (title) => {
    //     return [
    //         {
    //             title: title,
    //             dataIndex: "name",
    //             key: "name"
    //         }, {
    //             title: "个人/年级题量",
    //             dataIndex: "count",
    //             key: "count"
    //         }, {
    //             title: "个人/年级得分率",
    //             dataIndex: "score",
    //             key: "score"
    //         }
    //     ]
    // }

    // getTableData = (data,level) => {
    //     let tableData =[];
    //     data.forEach(element=>{
    //         let childrenData=[];
    //         let curLevel = level;            
    //         if(element.hasOwnProperty("childKnowledges")){
    //             // level++;
    //             childrenData = this.getTableData(element.childKnowledges,level+1);
    //         }
    //         let itemData={};
    //         itemData.key=element.id;
    //         itemData.name=element.name;
    //         itemData.level = level;
    //         if(level===0){
    //             itemData.count = "个人/年级题量";
    //             itemData.score = "个人/年级得分率";
    //         }else{
    //             let sScore = Math.round(element.classTopicAnswerScore/element.classTopicTotalScore*10000)/100;
    //             if(isNaN(sScore)) sScore =0;
    //             let gScore = Math.round(element.gradeTopicAnswerScore/element.gradeTopicTotalScore*10000)/100;
    //             if(isNaN(gScore)) gScore =0;
    //             itemData.count = element.classTopicNum+"道 / " + element.gradeTopicNum + "道";
    //             itemData.score = sScore+"% / "+gScore +"%";
    //         }
    //         if(childrenData.length>0) itemData.children = childrenData;
    //         tableData.push(itemData);
    //     })
    //     return tableData;   
    // }

    // customExpandIcon=(props)=> {
    //     if(props.record.children&& props.record.children.length > 0){
    //         if (props.expanded) {
    //             return <a style={{ color: 'black',marginRight:8 }} onClick={e => {
    //                 props.onExpand(props.record, e);
    //             }}><img src={require("../../assets/contract.png")}/></a>
    //         } else {
    //             return <a style={{ color: 'black' ,marginRight:8 }} onClick={e => {
    //                 props.onExpand(props.record, e);
    //             }}><img src={require("../../assets/expand.png")}/></a>
    //         }
    //     }else{
    //         return <span style={{marginRight:8 }}></span>
    //     }
    // }

    // getRowClass=(record)=>{
    //     if(record.level===0) return Styles.table_header;
    //     return Styles.table_row;
    // }

    onChange = (key) => {
        console.log(key);
      }

    render() {
        const { selSubjet, selView } = this.state;
        const renderComprehensive = () => {
            const { totalStatistics, totalOverView } = this.props.situation;
            const lengendColor = this.getColor();
            return (
                <div>
                    <div className={Styles.container}>
                        <div className={Styles.title}>学习任务情况统计</div>
                        <Row span={24}>
                            <Col span={8}>
                                <ReactEcharts option={this.getTaskCountOption()}></ReactEcharts>
                                <div className={Styles.count}>{totalOverView.taskCount || "0个"}</div>
                                <div className={Styles.textCenter}>任务量</div>
                                <div className={Styles.legendContainer}>
                                    {totalStatistics && totalStatistics.map((item, index) => {
                                        let color = lengendColor[index%lengendColor.length];
                                        return <div><div className={Styles.subjectIcon} style={{ backgroundColor: color}} />{item.subjectName||""} | {Math.round(item.taskNum / totalOverView.taskCount*10000)/100||0}% {item.taskNum||0}次</div>;
                                    })}

                                </div>
                            </Col>
                            <Col span={8}>
                                <ReactEcharts option={this.getTopicCountOption()}></ReactEcharts>
                                <div className={Styles.count}>{totalOverView.topicCount || "0题"}</div>
                                <div className={Styles.textCenter}>题量</div>
                                <div className={Styles.legendContainer}>
                                {totalStatistics && totalStatistics.map((item, index) => {
                                        let color = lengendColor[index%lengendColor.length];
                                        return <div><div className={Styles.subjectIcon} style={{ backgroundColor: color}} />{item.subjectName||""} | {Math.round(item.topicCount / totalOverView.topicCount*10000)/100||0}% {item.topicCount||0}题</div>;
                                    })}
                                </div>
                            </Col>
                            <Col span={8}>
                                <ReactEcharts option={this.getTimeOption()}></ReactEcharts>
                                <div className={Styles.count}>{totalOverView.userTime || "0分钟"}</div>
                                <div className={Styles.textCenter}>学习用时</div>
                                <div className={Styles.legendContainer}>
                                {totalStatistics && totalStatistics.map((item, index) => {
                                        let color = lengendColor[index%lengendColor.length];
                                        return <div><div className={Styles.subjectIcon} style={{ backgroundColor: color}} />{item.subjectName||""} | {Math.round(item.taskTotalTime / totalOverView.userTime*10000)/100||0}% {item.taskTotalTime||0}分钟</div>;
                                    })}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className={Styles.container}>
                        <div className={Styles.title}>各科得分率统计</div>
                        <ReactEcharts option={this.getScoreBarOption()}></ReactEcharts>
                    </div>
                </div>)
        }
        const renderKnowleadge = () => {
            const { taskStatistics,knowleadge } = this.props.situation;
            return (<div>
                <div className={Styles.container}>
                    <div className={Styles.title}>知识点掌握情况</div>
                    <Row span={24} className={Styles.KnowsOverView}>
                        <Col span={8}>
                            <Progress type="circle" percent={100} strokeColor={"#ff6755"} format={() => { return (taskStatistics&&taskStatistics.taskNum||0) + "个";}} />
                            <div className={Styles.sub_title}>任务数</div>
                        </Col>
                        <Col span={8}>
                            <Progress type="circle" percent={100} strokeColor={"#2cbafd"} format={() => { return (taskStatistics&&taskStatistics.topicNum||0) + "题"}} />
                            <div className={Styles.sub_title}>题量</div>
                        </Col>
                        <Col span={8}>
                            <Progress type="circle" percent={taskStatistics&&taskStatistics.scoreRate||0} strokeColor={"#1dc99a"} format={() => {return (Math.round(taskStatistics&&taskStatistics.scoreRate*100||0)/100) + "%"}} />
                            <div className={Styles.sub_title}>得分率</div>
                        </Col>
                    </Row>
                </div>
                <div>                  
                    {isNull(knowleadge)?<Empty/>:<KnowLeadge />}
                </div>
            </div>)
        }

        const renderPanelHeader=(name,count,score,level)=>{
            let space = 1.5*(level+1)+"rem";
            return (<div className={level==0?Styles.table_header:Styles.table_row}><span className={Styles.title} style={{paddingLeft:space}}>{name}</span><span>{count}</span><span>{score}</span></div>)
        }

        const renderAccordionData=(data,level)=>{
            return data.map((element)=>{
                let sScore = Math.round(element.classTopicAnswerScore/element.classTopicTotalScore*10000)/100;
                if(isNaN(sScore)) sScore =0;
                let gScore = Math.round(element.gradeTopicAnswerScore/element.gradeTopicTotalScore*10000)/100;
                if(isNaN(gScore)) gScore =0;
                let count = element.classTopicNum+"道 / " + element.gradeTopicNum + "道";
                let score = sScore+"% / "+gScore +"%";

                if(element.hasOwnProperty("childKnowledges")){
                    const childrenDOM = renderAccordionData(element.childKnowledges,level+1);
                    if(level==0){
                        score = "个人/年级得分率";
                        count = "个人/年级题量";
                    }
                    return (<Accordion><Accordion.Panel className={level==0?Styles.header_accordion_panel:Styles.row_accordion_panel} header={renderPanelHeader(element.name,count,score,level)}><List>{childrenDOM}</List></Accordion.Panel></Accordion>)
                }
                let space = 1.5*(level+1)+"rem";
                return(<List.Item className={Styles.list_item}><span style={{paddingLeft:space}}>{element.name}</span><span>{count}</span><span>{score}</span></List.Item>)
            })         
        }

        const renderKnowleadgeTable = () => {
            const {knowleadgeList}=this.props.situation;
            if(isNull(knowleadgeList)) return (<div style={{ width: "100%" }}><Empty/></div>);
            return (<div style={{ width: "100%" }}>
                <Accordion className={Styles.accordion} defaultActiveKey="0" onChange={this.onChange}>
                    {renderAccordionData(knowleadgeList,0)}
                </Accordion>
           
            {/* <Table columns={this.getColumnsData(knowleadgeList[0].name)} rowClassName={this.getRowClass} dataSource={this.getTableData(knowleadgeList,0)} expandIcon={(props) => this.customExpandIcon(props)} pagination={false} showHeader={false}></Table> */}
            {/* } */}
            </div>)
        }

        return (
            <div>
                <TopNav title="学情分析" onLeftClick={this.back}></TopNav>
                <SubjectNav onChange={this.changeSubject}></SubjectNav>
                {selSubjet == 0 ? renderComprehensive() : <div>
                    <div className={Styles.segment}>
                        <SegmentedControl selectedIndex={selView} values={["知识图谱", "知识点详情"]} onChange={this.changeSelView}></SegmentedControl>
                    </div>
                    {selView == 0 ? renderKnowleadge() : renderKnowleadgeTable()}
                </div>}
            </div >
        )
    }
}
export default connect(({ learningSituation }) => { return { situation: learningSituation } })(learningSituation)