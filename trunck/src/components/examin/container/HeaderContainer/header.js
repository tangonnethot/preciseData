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
    if( question.degree==key ){
      return degreeIndex=index;
    }
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
      {
        userScore !== undefined && <Fragment>
          {
            userScore == -1 && <div className={classnames(Style.userScore,Style.unmark)}>未阅</div>
          }
          {
            userScore == 0 && <div className={classnames(Style.userScore,Style.wrong)}>错误</div>
          }
          {
            userScore > 0 && <div className={classnames(Style.userScore)}>{userScore}分</div>
          }
        </Fragment>
      }
    </Row>
  )
}
export default Header;