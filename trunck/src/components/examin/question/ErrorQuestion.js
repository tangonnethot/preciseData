import React , { Fragment } from 'react';
import { Stem , ErrorAnswer , VideoAnalysis , ErrorAnalysis } from '../parts';
import Style from './index.less'
const ErrorQuestion = props => {
  const { question , userAnswer } = props;
  return (
    <div className={Style.question}>
      {
        question && <Fragment>
          { question.stem && <Stem text={question.stem} /> }
          { question.options && <ErrorAnswer {...props} /> }
          { question.analysis && <ErrorAnalysis {...props} /> }
        </Fragment>
      }
    </div>
  )
}
export default ErrorQuestion;