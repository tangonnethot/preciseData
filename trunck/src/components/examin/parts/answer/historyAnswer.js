import React, { Fragment } from 'react';
import classnames from 'classnames';
import Zmage from 'react-zmage'
import Style from './index.less';

const HistoryAnswer = props => {
  const { answerScoreList , question } = props;
  const ossHost = "";
  console.log( question,answerScoreList)
  return (
    <div className={Style.historyAnswer}>
      <div className={Style.title}>【历史答案】</div>
      {
        answerScoreList && answerScoreList.map( (item,index) => {
          return <Fragment key={index}>
            <div className={Style.historyTitle}>
              {
                question.score === item.score ? <div className={classnames(Style.result, Style.right)}>
                <span>正确</span>
              </div> : <div className={classnames(Style.result, Style.wrong)}>
                <span>错误</span>
              </div>
              }
              <div className={Style.time}>2019-11-22</div>
            </div>
            <div className={Style.answerDetail}>
              <div className={ answerScoreList.length > index+1 ? Style.line : Style.noline }>&nbsp;</div>
              <div className={Style.answerPics}>
              {
                !question.isChoice ? item.answer.split(",").map( item => {
                  return <div key={item} className={Style.answerPic}>
                      <Zmage src={ossHost+item}/>
                    </div>
                }) : item.answer
              }
          </div>
            </div>
          </Fragment>
        })
      }

    </div>

  )
}
export default HistoryAnswer;