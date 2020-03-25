import React , { Fragment } from 'react';
import { Stem , ErrorAnswer , VideoAnalysis , ErrorAnalysis , HistoryAnswer} from '../parts';
import Style from './index.less'
const ErrorQuestion = props => {
  const { question } = props;
  return (
    <div className={Style.question}>
      {
        question && <Fragment>
          { question.stem && <Stem text={question.stem} /> }
          { question.options && <ErrorAnswer {...props} /> }
          { question.analysis && <ErrorAnalysis {...props} /> }
          { question.videoAddress && <VideoAnalysis {...props} /> }
          <HistoryAnswer {...props} />
        </Fragment>
      }
    </div>
  )
}
export default ErrorQuestion;