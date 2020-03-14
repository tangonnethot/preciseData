import React from 'react';
import { convertChar } from '../../utils/utils';
import Style from './index.less';
import classNames from 'classnames';
const ChoiceOption = props => {
  return (
    <div className={props.isAnswer?classNames(Style.option, Style.checked):Style.option}>
      <div className={classNames(Style.optionChar,Style.choiceOptionChar)}>{convertChar(props.index+1)} </div> 
      <div className={Style.optionContent} dangerouslySetInnerHTML={{__html:props.text}}></div>
    </div>
  )
}
const ChoiceOptions = props => {
  return (
    <div className={Style.options}>
      {
        props.question.options.map( (item,index) => 
            <ChoiceOption key={index} text={item.text} index={index} isAnswer={item.isAnswer}/> )
      }
    </div>
  )
}
export default ChoiceOptions;




