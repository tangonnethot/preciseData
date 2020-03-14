import React from 'react';
import { Stem , ChoiceOptionsDo } from '../parts';
import Style from './index.less';


const DoChoice = props => {
  const { question } = props;
  console.log( props )
  return (
    <div className={Style.choice}>
      { question && <Stem text={question.stem} /> }
      { question && <ChoiceOptionsDo {...props } /> }
    </div>
  )
}

export default DoChoice;