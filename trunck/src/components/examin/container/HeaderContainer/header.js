import React , { Component , Fragment } from 'react';
import PropTypes from "prop-types";
import { Row , Col } from 'antd';
import Style from './index.less';


const Header = props => {
  const { question , questionIndex } = props;
  const { qtypename , score , degreeName } = question;
  return (
    <Row className={Style.header}>
      <Col>{questionIndex}</Col>
      <Col className={Style.type_name}>{qtypename}</Col>
      <Col className={Style.score}><span>{score}</span>分</Col>
      { question && question.topicGroup && <Col className={Style.group_name}>{question.topicGroup}</Col>}
    </Row>
  )
}
Header.propTypes = {
  question:PropTypes.shape({
    id:PropTypes.string.isRequired,
    qtypename:PropTypes.string.isRequired,
    score:PropTypes.number.isRequired,
    degreeName:PropTypes.string.isRequired
  }),
  questionIndex:PropTypes.number.isRequired
}
export default Header;