import React , { Fragment } from 'react';
import PropTypes from "prop-types";
import Style from "./index.less";
const Knowledge = props => {
  const { question } = props;
  return (
    <Fragment>
      {
        question && question.knowledges && <div className={Style.knowledge}>
        {
          question.knowledges.map( (item,index) => {
            return (
              <div key={index}>{item}</div>
            )
          })
        }
        </div>
      }
    </Fragment>
  )
}
Knowledge.propTypes = {
  question:PropTypes.shape({
    knowledges:PropTypes.array.isRequired
  })
}
export default Knowledge;