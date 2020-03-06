import React , { Component } from 'react';
import { Stem , Options , AnswerAnalysis } from '../parts';
import Style from './index.less';

const Choice = props => {
  const { question } = props;
  const { stem , options , answer , analysis , qtype , isChoice } = question;
  return (
    <div className={Style.choice}>
      { question && question.stem && <Stem text={question.stem} /> }
      { question && question.options && <Options textArr={question.options} /> }
      { question && <AnswerAnalysis answer={answer} analysis={analysis} qtype={qtype} isChoice={isChoice}/> }
    </div>
  )
}

export default Choice;