import React from 'react';
import PropTypes from "prop-types";
import { convertChar } from '../../utils/utils';
import Style from './index.less';

const Answer = props => {
  const { answerText , isChoice } = props;
  return (
    <div className={Style.answer}>
      <div className={Style.title}>【答案】</div>
      {
        answerText.map( (item,index) => {
          return <div key={index}>
            { isChoice ? convertChar(item.index) : <div dangerouslySetInnerHTML={{__html:answerText.length>index+1?item.text+'、':item.text}}/>}
          </div>
        })
      }
    </div>
    
  )
}
Answer.propTypes = {
  answerText:PropTypes.array.isRequired
}
export default Answer;