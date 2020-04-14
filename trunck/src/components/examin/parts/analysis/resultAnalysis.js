import React from 'react';
import Style from './index.less';
import classnames from 'classnames';
const ResultAnalysis = props => {
  return (
    <div className={classnames(Style.analysis,Style.resultAnalysis)}>
      <div className={Style.title}>文本解析：</div>
      <div dangerouslySetInnerHTML={{__html:props.question.analysis}}/>
    </div>
  )
}
export default ResultAnalysis;