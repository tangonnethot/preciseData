import React , { Component } from 'react';
import { Stem , ChoiceOptions , ChoiceOptionsDo , AnswerAnalysis } from '../parts';
import Style from './index.less';

const Choice = props => {
  const { question } = props;
  const { stem , options , answer , analysis , qtype , isChoice } = question;
  return (
    <div className={Style.choice}>
      { question && question.stem && <Stem text={question.stem} /> }
      { question && question.options && <ChoiceOptions textArr={question.options} /> }
      {/* { question && <AnswerAnalysis answer={answer} analysis={analysis} qtype={qtype} isChoice={isChoice}/> } */}
    </div>
  )
}
const DoChoice = props => {
  const { question } = props;
  const { stem , options , answer , analysis , qtype , isChoice } = question;
  return (
    <div className={Style.choice}>
      { question && question.stem && <Stem text={question.stem} /> }
      { question && question.options && <ChoiceOptionsDo 
                                          textArr={question.options} 
                                          userAnswer={props.userAnswer}
                                          optionClick={props.optionClick}/> }
      {/* { question && <AnswerAnalysis answer={answer} analysis={analysis} qtype={qtype} isChoice={isChoice}/> } */}
    </div>
  )
}

export {
  Choice,
  DoChoice
};