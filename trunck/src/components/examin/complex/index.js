import React , { Component } from 'react';
import { Stem , Options , AnswerAnalysis } from '../parts';
import Style from './index.less';

const Complex = props => {
  const { question , children } = props;
  const { stem , options , answer , analysis } = question;
  return (
    <div className={Style.complex}>
      { question && question.stem && <Stem text={question.stem} /> }
      {
        children
      }
    </div>
  )
}

export default Complex;