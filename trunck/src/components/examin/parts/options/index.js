import React , { Fragment } from 'react';
import PropTypes from "prop-types";
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
        props.textArr.map( (item,index) => <ChoiceOption key={index} text={item.text} index={index} isAnswer={item.isAnswer}/> )
      }
    </div>
  )
}
const MultiChoiceOption = props => {
  return (
    <div className={props.isAnswer?classNames(Style.option, Style.checked):Style.option}>
      <div className={classNames(Style.optionChar,Style.multiChoiceOptionChar)}>{convertChar(props.index+1)} </div> 
      <div className={Style.optionContent} dangerouslySetInnerHTML={{__html:props.text}}></div>
    </div>
  )
}
const MultiChoiceOptions = props => {
  return (
    <div className={Style.options}>
      {
        props.textArr.map( (item,index) => <MultiChoiceOption key={index} text={item.text} index={index} isAnswer={item.isAnswer}/> )
      }
    </div>
  )
}
const ChoiceOptionDo = props => {
  const isChecked=props.userAnswer && props.userAnswer.indexOf(convertChar(props.index+1))>-1;
  return (
    <div onClick={()=>props.optionClick(convertChar(props.index+1))} 
      className={isChecked?classNames(Style.option, Style.checked):Style.option}>
      <div className={classNames(Style.optionChar,Style.choiceOptionChar)}>{convertChar(props.index+1)} </div> 
      <div className={Style.optionContent} dangerouslySetInnerHTML={{__html:props.text}}></div>
    </div>
  )
}
const ChoiceOptionsDo = props => {
  return (
    <div className={classNames(Style.options,Style.do)}>
      {
        props.textArr.map( (item,index) => <ChoiceOptionDo 
                                              key={index} 
                                              text={item.text} 
                                              index={index} 
                                              userAnswer={props.userAnswer}
                                              optionClick={props.optionClick}/> )
      }
    </div>
  )
}
const MultiChoiceOptionDo = props => {
  const curChar = convertChar(props.index+1);
  const isChecked=props.userAnswer && props.userAnswer.indexOf(curChar)>-1;
  return (
    <div onClick={()=>{
      let userAns=props.userAnswer.split(",");
      isChecked ? userAns.splice( userAns.indexOf(curChar) , 1 ) : userAns.push(curChar);
      props.optionClick( userAns.sort().join(',') )
    }} 
      className={isChecked?classNames(Style.option, Style.checked):Style.option}>
      <div className={classNames(Style.optionChar,Style.multiChoiceOptionChar)}>{curChar} </div> 
      <div className={Style.optionContent} dangerouslySetInnerHTML={{__html:props.text}}></div>
    </div>
  )
}
const MultiChoiceOptionsDo = props => {
  return (
    <div className={classNames(Style.options,Style.do)}>
      {
        props.textArr.map( (item,index) => <MultiChoiceOptionDo 
                                              key={index} 
                                              text={item.text} 
                                              index={index} 
                                              userAnswer={props.userAnswer} 
                                              optionClick={props.optionClick}/> )
      }
    </div>
  )
}
ChoiceOptions.propTypes = {
  textArr:PropTypes.array.isRequired
}
MultiChoiceOptions.propTypes = {
  textArr:PropTypes.array.isRequired
}
ChoiceOptionsDo.propTypes = {
  textArr:PropTypes.array.isRequired,
  optionClick:PropTypes.func.isRequired,
  userAnswer:PropTypes.string
}
MultiChoiceOptionsDo.propTypes = {
  textArr:PropTypes.array.isRequired,
  optionClick:PropTypes.func.isRequired,
  userAnswer:PropTypes.string
}
export {
  ChoiceOptions,
  MultiChoiceOptions,
  ChoiceOptionsDo,
  MultiChoiceOptionsDo
};




