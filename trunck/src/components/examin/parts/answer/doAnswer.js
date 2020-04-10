import React, { Component } from 'react';
import { Icon} from 'antd-mobile';
import Zmage from 'react-zmage'
import Style from './index.less';
import Camera from '../../student/camera';

class DoAnswer extends Component {
  receiveSuccess=(url)=>{
    const {userAnswer} = this.props;
    let newAnswer =  userAnswer?userAnswer+","+url:url;
    this.props.receiveSuccess(newAnswer)
  }
  delAnswerByIndex(index){
    const {userAnswer,optionClick} = this.props;
    let newAnswer =  userAnswer.split(",");
    newAnswer.splice(index,1);
    optionClick( newAnswer.join(",") ,this.props.question.id);
  }
  render(){
    const { userAnswer } = this.props;
    const ossHost="";
    const userAnswerArr = userAnswer.length===0?[]:userAnswer.split(",");
    return (
        <div>
          {
            userAnswerArr.map( (item,index) => {
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
              failure={this.props.receiveFailure.bind(this)}/>
        </div>
    )
  }
}
export default DoAnswer;