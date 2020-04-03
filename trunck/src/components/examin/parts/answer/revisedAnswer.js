import React, { Component } from 'react';
import Zmage from 'react-zmage'
import { Icon} from 'antd-mobile';
import Style from './index.less';
import Camera from '../../student/camera';

class RevisedAnswer extends Component {
  receiveSuccess=(url)=>{
    const {revisedAnswer} = this.props;
    let newAnswer =  revisedAnswer?revisedAnswer+","+url:url;
    this.props.receiveSuccess(newAnswer)
  }
  delAnswerByIndex(index){
    const {revisedAnswer,optionClick} = this.props;
    let newAnswer =  revisedAnswer.split(",");
    newAnswer.splice(index,1);
    optionClick( newAnswer.join(",") ,this.props.question.id);
  }
  render(){
    const { revisedAnswer } = this.props;
    const ossHost = '';
    const revisedAnswerArr = revisedAnswer.length===0?[]:revisedAnswer.split(",");
    return (
      <div className={Style.revisedAnswer}>
        <div className={Style.title}>订正作答：</div>
        <div>
          {
            revisedAnswerArr.map( (item,index) => {
              return (
                <div key={item} className={Style.answerPic}>
                  <Zmage src={ossHost+item}/>
                  <Icon type='cross-circle-o' onClick={()=>this.delAnswerByIndex(index)}/>
                </div>
              )
            })
          }
          <Camera questionid={this.props.question.id} 
            takeCamera={this.props.takeCamera.bind(this)} 
            success={this.receiveSuccess.bind(this)} 
            failure={this.props.receiveFailure.bind(this)}
            btnText={'添加订正答案'}
            />
        </div>
      </div>
    )
  }
}
export default RevisedAnswer;