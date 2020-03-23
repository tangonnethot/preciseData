import React , { Fragment } from 'react';
import { Stem , ChoiceOptions , ErrorAnswer , ErrorAnalysis } from '../parts';
import Style from './index.less';

const ErrorChoice = props => {
  const { question } = props;
  return (
    <div className={Style.choice}>
      {
        question && <Fragment>
          { question.stem && <Stem text={question.stem} /> }
          { question.options && <ChoiceOptions {...props } /> }
          { question.options && <ErrorAnswer {...props} /> }
          { question.analysis && <ErrorAnalysis {...props} /> }
        </Fragment>
      }
    </div>
  )
}

export default ErrorChoice;