import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import { Row, Col} from 'antd';
import Styles from './index.less';
import { connect } from 'dva';
import { isNull } from '../../utils/utils';
// import ReactEchartsCore from 'echarts-for-react/lib/core';
//import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/tree'; 
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';

class Knowleadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabAtlas: 0,
      tabAtlasIdx:0,
      selknowleadgedata: {},
      // tabAtlas: this.props.learningSituation.selKnowleadge.id,
      // selknowleadgedata: this.props.learningSituation.selKnowleadge,
      needupdateEcharts: true
    }
  }
  nodes = [];
  linkes = [];

  convertSymbolSize = (item) => {
    // var scale =Math.Ceil(item.classTopicNum/50);
    // return 7+scale;
    return 10;
  }

  convertSymbolColor = (item) => {
    if(item.classTopicTotalScore>95){
      return '#11a106';
    }
    if(item.classTopicTotalScore>85){
      return '#1dc99a';
    }
    if(item.classTopicTotalScore>75){
      return '#d7e047';
    }
    if(item.classTopicTotalScore>60){
      return '#ec7946';
    }
    if(item.classTopicTotalScore>0){
      return '#eb4646';
    }
    return '#999';
  }
  convertNode = (item) => {
    var size = this.convertSymbolSize();
    var color = this.convertSymbolColor(item);
    return {
      id: item.id,
      name: item.name,
      gradeTopicAnswerScore: item.gradeTopicAnswerScore,
      gradeTopicNum: item.gradeTopicNum,
      classTopicNum: item.classTopicNum,
      classTopicTotalScore: item.classTopicTotalScore,
      symbolSize: size,
      itemStyle: {
        color: color
      }
    }
  }
  getIndexbyItem = (item) => {
    for (var index = 0; index < this.data.length; index++) {
      if (this.data[index].indexOf(item) >= 0) {
        return index;
      }
    }
    return 0;
  }
  convertLink = (parentid, itemid) => {
    var index = this.linkes.length + 1;
    return {
      id: index,
      source: itemid,
      target: parentid
    }
  }

  convertItem = (parentitem, item) => {
    this.nodes.push(this.convertNode(item));
    if (parentitem && item)
      this.linkes.push(this.convertLink(parentitem.id, item.id))
    if (item.hasOwnProperty("childKnowledges")) {
      for (var i = 0; i < item.childKnowledges.length; i++) {
        this.convertItem(item, item.childKnowledges[i]);
      }
    }

  }

  covertData = (idx) => {
    // var idx = this.state.tabAtlas;
    this.nodes = [];
    this.linkes = [];
    if (this.props.learningSituation && this.props.learningSituation.knowleadge) {
      this.props.learningSituation.knowleadge.forEach((item, index) => {
        if (item.id === idx) {
          return this.convertItem(null, item);
        }
      })
    }
  }

  RenderTabsAtlas = () => {  
    let tabAIdx = this.state.tabAtlasIdx;
    const {knowleadge} = this.props.learningSituation;
    if (!knowleadge || knowleadge.length <= 0) return;
    this.covertData(knowleadge[tabAIdx].id);
    // this.showMainAtlas();
    let _this = this; 
    return knowleadge.map((item,index) => {
      return (
        <li
          key={item.index}
          className={tabAIdx === index ? Styles.act : ''}
          onClick={() => { 
            _this.changeTabeAtlas(item.id,index)
          }}> 
          {item.name}
        </li>
      )
    })
  }

  changeTabeAtlas = (knowId,idx) => {
    this.covertData(knowId);
    var data = this.getKnowleadgeById(knowId);
    this.setState({
      tabAtlas: knowId,
      tabAtlasIdx:idx,
      selknowleadgedata: data
    });
  }

  getKnowleadgeById = (knowleadgeId) => {
    // var knowleadgeId = this.state.tabAtlas;
    for (var index = 0; index < this.nodes.length; index++) {
      if (this.nodes[index].id === knowleadgeId) {
        return this.nodes[index];
      }
    }
  }


  // showMainAtlas = () => {
  //   // this.covertData(idx);
  //   const { selknowleadgedata } = this.state;
  //   if (isNull(selknowleadgedata)) {
  //     return this.getAtlasTpl("", "0", "0", "0", "0");
  //   }
  //   return this.getAtlasTpl(selknowleadgedata.name, selknowleadgedata.classTopicTotalScore, selknowleadgedata.classTopicNum, selknowleadgedata.gradeTopicAnswerScore, selknowleadgedata.gradeTopicNum)
  // }

  getOption = () => {
    // this.covertData(this.state.tabAtlas);
    var nodes = this.nodes;
    var linkes = this.linkes;
    return {
      series: [{
        type: 'graph',
        data: nodes,
        links: linkes,
        top: '1%',
        bottom: '14%',
        layout: 'force',
        roam: true,
        focusNodeAdjacency: false,
        layoutAnimation: false,
        draggable: false,
        // symbol: 'emptyCircle', 
        symbolSize: 7,
        label: {
          normal: {
            show: false,
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
            color:"#333",
            fontSize: 14
          }
        },
        force: {
          repulsion: 20
        }
      }]
    }
  }

  render() {
    const { needupdateEcharts, tabAtlas } = this.state;

    return (
      <div className={Styles.container}>
        <div className={Styles.title}>
          <ul className={Styles.subjectTabAtlas}>
            {this.RenderTabsAtlas(tabAtlas, this.changeTabeAtlas)}
          </ul>
        </div>
        <Row type='flex' justify="start" align="middle" >
          <Col span={24}>
            <div className={Styles.KnowLeadgeWrap}>
              <ReactEcharts
                option={this.getOption()}
                style={{ height: '55rem', width: '100%' }}
                shouldSetOption={needupdateEcharts}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default connect(({ learningSituation }) => {
  return {
    learningSituation: learningSituation
  }
})(Knowleadge);