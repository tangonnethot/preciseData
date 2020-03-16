import React , { Fragment } from 'react';
import { Stem , UserAnswer , RevisedAnswer , ResultAnswer , VideoAnalysis } from '../parts';
import Style from './index.less'
const ErrorQuestion = props => {
  const { question , userAnswer } = props;
  return (
    <div className={Style.question}>
      {
        question && <Fragment>
          { question.stem && <Stem text={question.stem} /> }
          { userAnswer && <UserAnswer {...props} /> }
          { userAnswer && <RevisedAnswer {...props} /> }
          { question.options && <ResultAnswer {...props} /> }
          { question.videoAddress && <VideoAnalysis {...props} /> }
        </Fragment>
      }
    </div>
  )
}
export default ErrorQuestion;