import React from 'react';
import { Stem , AnswerAnalysis } from '../parts';
import Style from './index.less'
const Question = props => {
  const { question } = props;
  return (
    <div className={Style.question}>
      { question && question.stem && <Stem text={question.stem} /> }
      { question && <AnswerAnalysis answer={question.answer} analysis={question.analysis}/> }
    </div>
  )
}
export default Question;