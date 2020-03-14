import React from 'react';
import { Icon } from 'antd-mobile';
import { Spin , message } from 'antd';
import { Stem , AnswerAnalysis } from '../parts';
import Style from './index.less'
const Question = props => {
  const { question } = props;
  return (
    <div className={Style.question}>
      { question && question.stem && <Stem text={question.stem} /> }
    </div>
  )
}
export default Question;