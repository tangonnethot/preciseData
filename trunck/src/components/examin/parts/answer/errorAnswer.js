import React from 'react';
import { convertChar } from '../../utils/utils';
import Style from './index.less';

const ErrorAnswer = props => {
  const { question } = props;
  let answer = '';
  question.options.map( (item,index) => {
    if( item.isAnswer){
      question.isChoice ? answer+=convertChar(index+1):answer=item.text;
    }
  })
  return (
    <div className={Style.errorAnswer}>
      <div className={Style.title}>【参考答案】</div>
      <div dangerouslySetInnerHTML={{__html:answer}}/>
    </div>
    
  )
}
export default ErrorAnswer;