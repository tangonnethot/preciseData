import React , { Fragment } from 'react';
import PropTypes from "prop-types";
import { convertChar } from '../../utils/utils';
import Style from './index.less';
import classNames from 'classnames';
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
        props.question.options.map( (item,index) => <MultiChoiceOption key={index} text={item.text} index={index} isAnswer={item.isAnswer}/> )
      }
    </div>
  )
}
MultiChoiceOptions.propTypes = {
  question:PropTypes.shape({
    options:PropTypes.array.isRequired
  })
}
export default MultiChoiceOptions;




