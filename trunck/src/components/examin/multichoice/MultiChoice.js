import React from 'react';
import { Stem , MultiChoiceOptions , MultiChoiceOptionsDo , AnswerAnalysis } from '../parts';
import Style from './index.less';
const MultiChoice = props => {
  const { question } = props;
  return (
    <div className={Style.multiChoice}>
      { question && question.stem && <Stem text={question.stem} /> }
      { question && question.options && <MultiChoiceOptions textArr={question.options} /> }
    </div>
  )
}
export default MultiChoice;