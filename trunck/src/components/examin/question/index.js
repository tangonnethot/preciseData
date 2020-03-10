import React from 'react';
import { Icon } from 'antd-mobile';
import { Stem , AnswerAnalysis } from '../parts';
import Style from './index.less'
const Question = props => {
  const { question } = props;
  return (
    <div className={Style.question}>
      { question && question.stem && <Stem text={question.stem} /> }
      {/* { question && <AnswerAnalysis answer={question.answer} analysis={question.analysis}/> } */}
    </div>
  )
}
const answers=[1,2]
const DoQuestion = props => {
  const { question } = props;
  return (
    <div className={Style.question}>
      { question && question.stem && <Stem text={question.stem} /> }
      <div>
        <div className={Style.answerPic}>
          <img src="https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1901900282.png" />
          <Icon type='cross-circle-o' />
        </div>
        <div className={Style.answerPic}>
          <img src="https://pic.rmb.bdstatic.com/40a0a760b601984e910a0465d70e84c4.jpeg"/>
          <Icon type='cross-circle-o' />
        </div>
        <div className={Style.photoBtn}>
          <i></i>
          <span>拍照上传答案</span>
        </div>
      </div>
      {/* { question && <AnswerAnalysis answer={question.answer} analysis={question.analysis}/> } */}
    </div>
  )
}
export {
  Question,
  DoQuestion
};