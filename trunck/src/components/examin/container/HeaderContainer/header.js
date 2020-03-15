import React, { Fragment } from 'react';
import { Row , Col } from 'antd';
import { SegmentedControl } from 'antd-mobile';
import classnames from 'classnames';
import Style from './index.less';
import constant from '../../../../utils/constant';


const Header = props => {
  const { question , questionIndex , userScore} = props;
  let degreeIndex=-1;
  Object.keys( constant.questionDifficultyLevel ).map( (key,index) => {
    if( question.degree==key ) degreeIndex=index;
  })
  return (
    <Row className={Style.header}>
      <Col>{questionIndex}</Col>
      <Col className={Style.type_name}>{question.qtypename}</Col>
      <Col className={Style.score}><span>{question.score}</span>分</Col>
      { question && question.topicGroup ? <Col className={Style.group_name}>{question.topicGroup}</Col> : ''}
      { question.degree && <div className={Style.degree}>
        <SegmentedControl selectedIndex={degreeIndex} values={['易', '中', '难']} disabled />
        </div> }
      <div className={userScore<=0?classnames(Style.userScore,Style.wrong):Style.userScore}>
      { userScore<=0 ? '错误': <Fragment>{userScore}分</Fragment>}
      </div>
    </Row>
  )
}
export default Header;