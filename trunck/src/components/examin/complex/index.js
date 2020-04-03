import React , { Component } from 'react';
import { Stem } from '../parts';
import Style from './index.less';

const Complex = props => {
  const { question , children } = props;
  return (
    <div className={Style.complex}>
      { question && question.stem && <div className={Style.complexStem}>
          <span className={Style.complexTitle}>【复合题】</span>
          <Stem text={question.stem} />
        </div> }
      {
        children
      }
    </div>
  )
}

export default Complex;