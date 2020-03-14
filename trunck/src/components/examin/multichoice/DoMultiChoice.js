import React from 'react';
import { Stem , MultiChoiceOptionsDo } from '../parts';
import Style from './index.less';

const DoMultiChoice = props => {
  const { question } = props;
  return (
    <div className={Style.multiChoice}>
      { question && question.stem && <Stem text={question.stem} /> }
      { question && question.options && <MultiChoiceOptionsDo {...props} /> }
    </div>
  )
}
export default DoMultiChoice;