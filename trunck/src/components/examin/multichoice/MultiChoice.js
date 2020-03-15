import React , { Fragment } from 'react';
import { Stem , MultiChoiceOptions , ResultAnswer , VideoAnalysis } from '../parts';
import Style from './index.less';

const DoMultiChoice = props => {
  const { question } = props;
  return (
    <div className={Style.multiChoice}>
      {
        question && <Fragment>
          { question.stem && <Stem text={question.stem} /> }
          { question.options && <MultiChoiceOptions {...props } /> }
          { question.options && <ResultAnswer {...props} /> }
          { question.videoAddress && <VideoAnalysis {...props} /> }
        </Fragment>
      }
    </div>
  )
}
export default DoMultiChoice;