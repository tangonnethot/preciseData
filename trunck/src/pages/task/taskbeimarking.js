import React from 'react'
import { WhiteSpace, ListView, Badge, Icon } from 'antd-mobile'
import { Empty } from 'antd'
import TopNav from '../../components/nav'
import { convertTaskType, formatDate1, formatDate2, isNull, getUserID } from '../../utils/utils'
import { goHome } from '../../utils/andriod'
import Styles from './index.less'
import { connect } from 'dva'
import classnames from 'classnames';

@connect(({ task }) => ({ task }))
export default class Taskbeimarking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
    }

  }


  componentDidMount() {

  }


  back = () => {
    goHome();
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

  render() { 

    return (
      <div className={Styles.taskmarkingContainer}>
        <TopNav title="被批阅任务" onLeftClick={this.back}></TopNav>
        <div className={Styles.tasklist}>
          <WhiteSpace size="lg" />
          <div className={Styles.task_item}>
              <div>
                  <img style={{ width: "45px" }} src={this.getSubjectimg(100)} alt="" />
                  <span className={Styles.title}>任务名称</span>
                  <span className={Styles.markingPeople}>阅卷人：王政务</span>
                  <span className={Styles.markingDefault}><span><Icon type='right' size='lg'/></span></span>
              </div>
              <div style={{paddingLeft: "54px" }}>
                  <span className={classnames(Styles.label,Styles.task_label)}>{convertTaskType(1)}</span> 
                  <span className={classnames(Styles.label,Styles.review_label)}>在线阅</span> 
                  <span className={Styles.startTime}>截止日期： <span>{123}</span>
                  <span style={{ paddingLeft: "10px" }}>{123}</span></span>
              </div>
          </div>
        </div>
      </div>
    )
  }
}