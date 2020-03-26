import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import { Row, Col } from 'antd';
import Styles from './index.less';
import { connect } from 'dva';
import { isNull } from '../../utils/utils';
// import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/tree';
import { util } from 'echarts/lib/export';
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';

// @connect(({learningSituation})=>({learningSituation}))
class Knowleadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabAtlas: 0,
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
    return 7;
  }

  convertSymbolColor = (item) => {
    if (item.classTopicTotalScore > 60) {
      return '#31cebc';
    }

    if (item.classTopicTotalScore == 0) {
      return '#333';
    }
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
    if (item.hasOwnProperty("childList")) {
      for (var i = 0; i < item.childList.length; i++) {
        this.convertItem(item, item.childList[i]);
      }
    }

  }

  covertData = (idx) => {
    // var idx = this.state.tabAtlas;
    this.nodes = [];
    this.linkes = [];
    if (this.props.learningSituation && this.props.learningSituation.knowleadge) {
      this.props.learningSituation.knowleadge.forEach((item, index) => {
        if (item.id == idx) {
          return this.convertItem(null, item);
        }
      })
    }
  }

  RenderTabsAtlas = (tab, changeTabs) => {
    if (!this.props.learningSituation.knowleadge || this.props.learningSituation.knowleadge.length <= 0) return;
    if (isNull(tab)) tab = this.props.learningSituation.knowleadge[0].id;
    return this.props.learningSituation.knowleadge.map((item) => {
      return (
        <li
          key={item.id}
          className={tab === item.id ? Styles.act : ''}
          onClick={() => {
            changeTabs(item.id)
          }}>
          {item.name}
        </li>
      )
    })
  }

  changeTabeAtlas = (idx) => {
    this.covertData(idx);
    var data = this.getKnowleadgeById(idx);
    this.setState({
      tabAtlas: idx,
      selknowleadgedata: data
    });
  }

  getKnowleadgeById = (knowleadgeId) => {
    // var knowleadgeId = this.state.tabAtlas;
    for (var index = 0; index < this.nodes.length; index++) {
      if (this.nodes[index].id == knowleadgeId) {
        return this.nodes[index];
      }
    }
  }

  // getAtlasTpl = (name, classScore, classCount, gradeScore, gradeCount) => {
  //   return <div className={Styles.atlasWrap}>
  //     <h3 className={Styles.atlasWraph3}>{name}</h3>
  //     <h4 className={Styles.atlasWraph4}>班级得分率：<span>{classScore}</span></h4>
  //     <h4 className={Styles.atlasWraph4}>班级题量：<span>{classCount}道</span></h4>
  //     <h4 className={Styles.atlasWraph4}>年级得分率：<span>{gradeScore}</span></h4>
  //     <h4 className={Styles.atlasWraph4}>年级题量：<span>{gradeCount}道</span></h4>
  //     <h5 className={Styles.atlasWraph5}>图例</h5>
  //     <ul className={Styles.atlasWrapul}>
  //       <li>图像大小代表信度（与时间和题量等因素相关，题量越多，时间越近，信度越高）</li>
  //       <li>红色代表得分率很差</li>
  //       <li>绿色代表得分率较高</li>
  //       <li>灰色代表得分率为0</li>
  //     </ul>
  //     <h5 className={Styles.atlasWraph5}>提示</h5>
  //     <h6 className={Styles.atlasWraph6}>点击图谱可以查看详情</h6>
  //   </div>
  // }

  showMainAtlas = () => {
    // this.covertData(idx);
    const { selknowleadgedata } = this.state;
    if (isNull(selknowleadgedata)) {
      return this.getAtlasTpl("", "0", "0", "0", "0");
    }
    return this.getAtlasTpl(selknowleadgedata.name, selknowleadgedata.classTopicTotalScore, selknowleadgedata.classTopicNum, selknowleadgedata.gradeTopicAnswerScore, selknowleadgedata.gradeTopicNum)
  }

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
            fontSize: 9
          }
        },
        force: {
          repulsion: 20
        }
      }]
    }
  }

  render() {
    const { needupdateEcharts, tabAtlas, selknowleadgedata } = this.state;
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
                style={{ height: '550px', width: '100%' }}
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