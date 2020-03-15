import React from 'react';
import { convertChar } from '../../utils/utils';
import Style from './index.less';

const ResultAnswer = props => {
  const { question } = props;
  let answer = '';
  question.options.map( (item,index) => {
    if( item.isAnswer){
      question.isChoice ? answer+=convertChar(index+1):answer=item.text;
    }
  })
  return (
    <div className={Style.answer}>
      <div className={Style.title}>正确答案：{question.isChoice?answer:''}</div>
      { !question.isChoice ? <div dangerouslySetInnerHTML={{__html:answer}}/> : ''}
    </div>
    
  )
}
export default ResultAnswer;