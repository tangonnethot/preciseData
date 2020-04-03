import React, { Component } from 'react';
import { Icon} from 'antd-mobile';
import Zmage from 'react-zmage'
import Style from './index.less';
import Camera from '../../student/camera';

class DoAnswer extends Component {
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
    const { userAnswer } = this.props;
    // const ossHost = 'https://www.baidu.com';
    const ossHost="";
    const userAnswerArr = userAnswer.length===0?[]:userAnswer.split(",");
    return (
        <div>
          {
            userAnswerArr.map( (item,index) => {
              return (
                <div key={item} className={Style.answerPic}>
                  <Zmage src={ossHost+"/"+item}/>
                  {/* <Zmage src={item}/> */}
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