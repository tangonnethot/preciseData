import React , { Fragment } from 'react';
import { Stem , MultiChoiceOptions , ErrorAnswer , ErrorAnalysis , VideoAnalysis , HistoryAnswer } from '../parts';
import Style from './index.less';

const ErrorMultiChoice = props => {
  const { question } = props;
  return (
    <div className={Style.multiChoice}>
      {
        question && <Fragment>
          { question.stem && <Stem text={question.stem} /> }
          { question.options && <MultiChoiceOptions {...props } /> }
          { question.options && <ErrorAnswer {...props} /> }
          { question.analysis && <ErrorAnalysis {...props} /> }
          { question.videoAddress && <VideoAnalysis {...props} /> }
          <HistoryAnswer {...props} />
        </Fragment>
      }
    </div>
  )
}
export default ErrorMultiChoice;