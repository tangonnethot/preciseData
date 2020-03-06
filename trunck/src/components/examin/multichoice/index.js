import React from 'react';
import { Stem , Options , AnswerAnalysis } from '../parts';
import Style from './index.less';
const MultiChoice = props => {
  const { question } = props;
  const { stem , options , answer , analysis , qtype , isChoice } = question;
  return (
    <div className={Style.multiChoice}>
      { question && question.stem && <Stem text={question.stem} /> }
      { question && question.options && <Options textArr={question.options} /> }
      { question && <AnswerAnalysis answer={answer} analysis={analysis} qtype={qtype} isChoice={isChoice}/> }
    </div>
  )
}
export default MultiChoice;