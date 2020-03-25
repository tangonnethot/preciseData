import React , { Fragment } from 'react';
import { Stem , ChoiceOptions , ErrorAnswer , ErrorAnalysis , VideoAnalysis , HistoryAnswer } from '../parts';
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
          { question.videoAddress && <VideoAnalysis {...props} /> }
          <HistoryAnswer {...props} />
        </Fragment>
      }
    </div>
  )
}

export default ErrorChoice;