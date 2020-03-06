import React from 'react';
import PropTypes from "prop-types";
import Style from "./index.less";
const Stem = props => {
  return (
    <div className={Style.stem} dangerouslySetInnerHTML={{__html:props.text}}></div>
  )
}
Stem.propTypes = {
  text:PropTypes.string.isRequired
}
export default Stem;