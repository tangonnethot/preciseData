import React, { Fragment } from 'react';
import { Icon} from 'antd-mobile';
import classnames from 'classnames';
import Style from './index.less';

const RevisedAnswer = props => {
  const { userAnswer } = props;
  let answers = userAnswer.split(",");
  const ossHost = "http://www.baidu.com";
  return (
    <div className={Style.revisedAnswer}>
      <div className={Style.title}>订正作答：</div>
      <div>
        {
          answers.map( item => {
            return (
              <div key={item} className={Style.answerPic}>
                <img src={ossHost+"/"+item}/>
                <Icon type='cross-circle-o' />
              </div>
            )
          })
        }
        <div onClick={()=>{}} className={Style.photoBtn}>
          <i></i>
          <span>添加订正答案</span>
        </div>
      </div>
    </div>
    
  )
}
export default RevisedAnswer;