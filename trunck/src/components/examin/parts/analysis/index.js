import React from 'react';
import PropTypes from "prop-types";
import Style from './index.less';
const Analysis = props => {
  return (
    <div className={Style.analysis}>
      <div className={Style.title}>【解析】</div>
      <div dangerouslySetInnerHTML={{__html:props.text?props.text:'略'}}></div>
    </div>
  )
}
Analysis.propTypes = {
  text:PropTypes.string.isRequired
}
export default Analysis;