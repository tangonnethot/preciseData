import React from 'react'; 
import Zmage from 'react-zmage'
import Style from './index.less';

const UserAnswer = props => {
  const { userAnswer } = props;
  let answers = userAnswer.split(",");
  const ossHost = "";
  return (
    <div className={Style.userAnswer}>
      <div className={Style.title}>我的作答：{userAnswer.length===0?'未作答':''}</div>
      { userAnswer.length>0 ? <div className={Style.answerPics}>
        {
          answers.map( item => {
            return <div key={item} className={Style.answerPic}>
                <Zmage src={ossHost+item}/>
              </div>
          })
        }
      </div> : ''}
    </div>
    
  )
}
export default UserAnswer;