import React from 'react';
import { Row , Col } from 'antd';
import Style from './index.less';


const Header = props => {
  const { question , questionIndex } = props;
  return (
    <Row className={Style.header}>
      <Col>{questionIndex}</Col>
      <Col className={Style.type_name}>{question.qtypename}</Col>
      <Col className={Style.score}><span>{question.score}</span>分</Col>
      { question && question.topicGroup ? <Col className={Style.group_name}>{question.topicGroup}</Col> : ''}
      { question.degree ? '难度': ''}
      { question.isRight ? '对错': ''}
    </Row>
  )
}
export default Header;