import React from 'react';
import { Stem , ChoiceOptions } from '../parts';
import Style from './index.less';

const Choice = props => {
  const { question } = props;
  return (
    <div className={Style.choice}>
      { question && question.stem && <Stem text={question.stem} /> }
      { question && question.options && <ChoiceOptions {...props } /> }
    </div>
  )
}

export default Choice;