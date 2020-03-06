import React , { Component } from 'react';
import Style from './index.less';

import Right from './images/right_icon.png';
import Wrong from './images/wrong_icon.png';

const StudentAnswerContainer = ( WrappedComponent ) =>
  class extends Component{
    render(){
      const { question } = this.props;
      return (
        <div className={Style.StudentAnswerContainer}>
          <WrappedComponent {...this.props} />
          <div className={Style.studentAnswer}>
            <div className={Style.title}>学生作答：</div>
            <div className={Style.answerContent}>
              {
                question && (
                  typeof question.answerText === 'string' ? <strong dangerouslySetInnerHTML={{__html:question.answerText}}/> : question.answerText && question.answerText.map( (item,index) => {
                    return <div key={index}>
                      <img src={item.url}/>
                    </div>
                  })
                )
              }
            </div>
            <div className={Style.studentScore}>
            { question && (question.isRight ? <img src={Right}/> : <img src={Wrong}/>) }
              <div>得分：<strong>{question && question.score}</strong></div>
            </div>
          </div>
        </div>
      )
    }
  }
export default StudentAnswerContainer