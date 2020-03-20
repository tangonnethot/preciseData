import React from 'react';
import Style from './index.less';
import classnames from 'classnames';
const ErrorAnalysis = props => {
  return (
    <div className={classnames(Style.analysis,Style.errorAnalysis)}>
      <div className={Style.title}>【文本解析】</div>
      <div dangerouslySetInnerHTML={{__html:props.question.analysis}}/>
    </div>
  )
}
export default ErrorAnalysis;