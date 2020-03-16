import React , { Fragment } from 'react';
import { Stem , ChoiceOptions , ResultAnswer , VideoAnalysis } from '../parts';
import Style from './index.less';

const ErrorChoice = props => {
  const { question } = props;
  return (
    <div className={Style.choice}>
      {
        question && <Fragment>
          { question.stem && <Stem text={question.stem} /> }
          { question.options && <ChoiceOptions {...props } /> }
          { question.options && <ResultAnswer {...props} /> }
          { question.videoAddress && <VideoAnalysis {...props} /> }
        </Fragment>
      }
    </div>
  )
}

export default ErrorChoice;