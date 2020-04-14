import React , { Fragment } from 'react';
import { Stem , MultiChoiceOptions , ResultAnswer , ResultAnalysis , VideoAnalysis } from '../parts';
import Style from './index.less';

const MultiChoice = props => {
  const { question } = props;
  return (
    <div className={Style.multiChoice}>
      {
        question && <Fragment>
          { question.stem && <Stem text={question.stem} /> }
          { question.options && <MultiChoiceOptions {...props } /> }
          { question.options && <ResultAnswer {...props} /> }
          { question.analysis && <ResultAnalysis {...props} /> }
          { question.videoAddress && <VideoAnalysis {...props} /> }
        </Fragment>
      }
    </div>
  )
}
export default MultiChoice;