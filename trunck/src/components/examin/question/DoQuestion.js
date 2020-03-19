import React, { Fragment } from 'react';
import { Icon } from 'antd-mobile';
import { Spin} from 'antd';
import { Stem  } from '../parts';
import Style from './index.less';
import Camera from '../student/camera';

class DoQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loading:false
    };
  }
  componentDidMount=()=>{ 
  }

  receiveSuccess=(url)=>{
    const {userAnswer} = this.props;
    let newAnswer =  userAnswer+","+url;
    this.setState({
      loading:false
    },()=>{
      this.props.optionClick( newAnswer ,this.props.question.id);
    });
  }

  receiveFailure =()=>{
    this.setState({
      loading:false
    });
  }

  takeCamera=()=>{
    this.setState({
      loading:true
    });
  }
  render(){
    const { question , userAnswer } = this.props;
    // const ossHost = 'https://www.baidu.com';
    const ossHost="";
    const userAnswerArr= (userAnswer&&userAnswer.length>0) ? userAnswer.split(","):["img/bd_logo1.png"];
    return (
      <Fragment>
        { this.props.question && <Spin spinning={this.state.loading} tip="上传中……">
          <div className={Style.question}>
            { question && question.stem && <Stem text={question.stem} /> }
            <div>
              {
                userAnswerArr.map( item => {
                  return (
                    <div key={item} className={Style.answerPic}>
                      {/* <img src={ossHost+"/"+item}/> */}
                      <img src={item}/>
                      <Icon type='cross-circle-o' />
                    </div>
                  )
                })
              }
              <Camera questionid={this.props.question.id} takeCamera={this.takeCamera.bind(this)} 
              success={this.receiveSuccess.bind(this)} failure={this.receiveFailure.bind(this)}/>
              {/* <div onClick={this.takeCamera} className={Style.photoBtn}>
                <i></i>
                <span>拍照上传答案</span>
              </div> */}
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