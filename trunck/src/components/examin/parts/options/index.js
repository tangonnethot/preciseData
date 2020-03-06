import React , { Fragment } from 'react';
import PropTypes from "prop-types";
import { convertChar } from '../../utils/utils';
import Style from './index.less';
const Option = props => {
  // const style={
  //   display:'inline-block',
  //   width: 100/props.'%'
  // };
  return (
    // <div style={style}>
    <div className={Style.option}>
      <div className={Style.optionChar}>{convertChar(props.index+1)}. </div> <div dangerouslySetInnerHTML={{__html:props.text}}></div>
    </div>
  )
}
const Options = props => {
  return (
    <div className={Style.options}>
      {
        props.textArr.map( (item,index) => {
          return <Option text={item.text} key={index} index={index}/>
        })
      }
    </div>
  )
}
Options.propTypes = {
  textArr:PropTypes.array.isRequired
}
export default Options;




