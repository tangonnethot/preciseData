import React , { Fragment } from 'react';
import PropTypes from "prop-types";
import { convertChar } from '../../utils/utils';
import Style from './index.less';
import classNames from 'classnames';
const optionClickFun = ( props,curOptionChar='',isChecked )=>{
  const { userAnswer , question , optionClick }=props;
  let userAns=userAnswer.length>0 ? userAnswer.split(""):[];
  isChecked ? userAns.splice( userAns.indexOf(curOptionChar) , 1 ) : userAns.push(curOptionChar);
  optionClick( userAns.sort().join('') , question.id )
}
const MultiChoiceOptionDo = props => {
  const { text,index , userAnswer , optionClick }=props;
  const curOptionChar = convertChar(index+1);
  const isChecked=userAnswer && userAnswer.indexOf(curOptionChar)>-1;
  return (
    <div onClick={()=>optionClickFun(props,curOptionChar,isChecked)} 
      className={isChecked?classNames(Style.option, Style.checked):Style.option}>
      <div className={classNames(Style.optionChar,Style.multiChoiceOptionChar)}>{curOptionChar} </div> 
      <div className={Style.optionContent} dangerouslySetInnerHTML={{__html:text}}></div>
    </div>
  )
}
const MultiChoiceOptionsDo = props => {
  return (
    <div className={classNames(Style.options,Style.do)}>
      {
        props.question.options.map( (item,index) => <MultiChoiceOptionDo 
                                              key={index} 
                                              text={item.text} 
                                              index={index} 
                                              {...props}
                                              /> )
      }
    </div>
  )
}
export default MultiChoiceOptionsDo;



