import React , { Component } from 'react';
import PropTypes from "prop-types";
import { Answer , Analysis } from '../';
import Style from './index.less';
class AnswerAnalysis extends Component{
  constructor(props){
    super(props);
    this.state={
      isShow:false
    }
  }
  changeStatus = () => {
    this.setState({
      isShow:!this.state.isShow
    })
  }
  render(){
    const { isShow } = this.state;
    const { answer , analysis , isChoice } = this.props;
    return (
      <div className={Style.answerAnalysis}>
        <div>
          <div className={Style.btn} onClick={this.changeStatus}>
            答案及解析
            <i className={isShow ? Style.arrowDown : Style.arrowDown+' '+Style.right }></i>
          </div>
        </div>
        {
          isShow && answer && <Answer answerText={answer} isChoice={isChoice}/>
        }
        {
          isShow && analysis && <Analysis text={analysis} /> 
        }
      </div>
    )
  }
}
AnswerAnalysis.propTypes = {
  answer:PropTypes.array,
  analysis:PropTypes.string
}
export default AnswerAnalysis;