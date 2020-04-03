import React from 'react';  
import { convertChar } from '../../utils/utils';
import Style from './index.less';
import classNames from 'classnames';
const ChoiceOptionDo = props => {
  const { text , index , userAnswer , question , optionClick} = props;
  const curOptionChar = convertChar(index+1);
  const isChecked=userAnswer && userAnswer.indexOf(curOptionChar)>-1;
  return (
    <div onClick={()=>optionClick(curOptionChar,question.id)} 
      className={isChecked?classNames(Style.option, Style.checked):Style.option}>
      <div className={classNames(Style.optionChar,Style.choiceOptionChar)}>{curOptionChar} </div> 
      <div className={Style.optionContent} dangerouslySetInnerHTML={{__html:text}}></div>
    </div>
  )
}
const ChoiceOptionsDo = props => {
  return (
    <div className={classNames(Style.options,Style.do)}>
      {
        props.question.options.map( (item,index) => <ChoiceOptionDo 
                                              key={index} 
                                              text={item.text} 
                                              index={index} 
                                              {...props}
                                              /> )
      }
    </div>
  )
}
export default ChoiceOptionsDo;




