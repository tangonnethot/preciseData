import React, { Fragment } from 'react';
import { Icon } from 'antd-mobile';
import { Spin , message } from 'antd';
import { Stem  } from '../parts';
import Style from './index.less';
import {
  takeCamera
} from '../../../utils/andriod';
class DoQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state={
      // loading:false//上次时loading动画作用范围？？？目前作用当前小题，会出新上次多个题目情况
      loadArr:{},
      userAnswerObj:{}
    };
    this.receiveAndroidUrl = this.receiveAndroidUrl.bind(this)
  }
  componentDidMount=()=>{
    const { question , userAnswer } = this.props;
    const userAnswerArr= (userAnswer&&userAnswer.length)>0 ? userAnswer.split(","):["img/bd_logo1.png"];
    this.setState({
      loadArr:Object.assign({},this.state.loadArr,{[question.id]:false}),
      userAnswerObj:Object.assign({},this.state.userAnswerObj,{[question.id]:userAnswerArr}),
    })
    //安卓上传回调方法
    window.receiveAndroidUrl = this.receiveAndroidUrl; 
  }
  receiveAndroidUrl(flag,id,url){
    if( flag ){
      message.success("上传成功")
      const userAnswerArr = {...this.state.userAnswerObj[id]};
      userAnswerArr.push(url);
      this.setState({
        loadArr:Object.assign({},this.state.loadArr,{[id]:false}),
        userAnswerObj:Object.assign({},this.state.userAnswerObj,{[id]:userAnswerArr}),
      },()=>{
        this.props.optionClick( this.userAnswerObj[id].join(",") , id );
      });
    }else{
      message.success("上传失败，请稍后重试");
      this.setState({
        loadArr:Object.assign({},this.state.loadArr,{[id]:false})
      });
    }
  }
  takeCamera=()=>{
    this.setState({
      loadArr:Object.assign({},this.state.loadArr,{[this.props.question.id]:true})
    });
    //调用安卓拍照方法
    takeCamera();
  }
  render(){
    const { question , userAnswer } = this.props;
    const ossHost = 'https://www.baidu.com';
    const userAnswerArr= (userAnswer&&userAnswer.length>0) ? userAnswer.split(","):["img/bd_logo1.png"];
    return (
      <Fragment>
        { this.props.question && <Spin spinning={this.state.loadArr[this.props.question.id]} tip="上传中……">
          <div className={Style.question}>
            { question && question.stem && <Stem text={question.stem} /> }
            <div>
              {
                userAnswerArr.map( item => {
                  return (
                    <div key={item} className={Style.answerPic}>
                      <img src={ossHost+"/"+item}/>
                      <Icon type='cross-circle-o' />
                    </div>
                  )
                })
              }
              <div onClick={this.takeCamera} className={Style.photoBtn}>
                <i></i>
                <span>拍照上传答案</span>
              </div>
            </div>
            {/* { question && <AnswerAnalysis answer={question.answer} analysis={question.analysis}/> } */}
          </div>
        </Spin>
      }
      </Fragment>
    )
  }
}
export default DoQuestion;