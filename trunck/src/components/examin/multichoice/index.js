import React from 'react';
import { Stem , MultiChoiceOptions , MultiChoiceOptionsDo , AnswerAnalysis } from '../parts';
import Style from './index.less';
const MultiChoice = props => {
  const { question } = props;
  const { stem , options , answer , analysis , qtype , isChoice } = question;
  return (
    <div className={Style.multiChoice}>
      { question && question.stem && <Stem text={question.stem} /> }
      { question && question.options && <MultiChoiceOptions textArr={question.options} /> }
      {/* { question && <AnswerAnalysis answer={answer} analysis={analysis} qtype={qtype} isChoice={isChoice}/> } */}
    </div>
  )
}
const DoMultiChoice = props => {
  const { question } = props;
  const { stem , options , answer , analysis , qtype , isChoice } = question;
  return (
    <div className={Style.multiChoice}>
      { question && question.stem && <Stem text={question.stem} /> }
      { question && question.options && <MultiChoiceOptionsDo 
                                          textArr={question.options} 
                                          userAnswer={props.userAnswer}
                                          optionClick={props.optionClick}/> }
      {/* { question && <AnswerAnalysis answer={answer} analysis={analysis} qtype={qtype} isChoice={isChoice}/> } */}
    </div>
  )
}
export {
  MultiChoice,
  DoMultiChoice
};