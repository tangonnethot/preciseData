import React , { Fragment } from 'react';
import { Spin} from 'antd';
import { Stem , UserAnswer , RevisedAnswer , ResultAnswer , VideoAnalysis } from '../parts';
import Style from './index.less'
class Question extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loading:false
    };
  }
  receiveSuccess=(newAnswer)=>{
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
    return (
      <Fragment>
        {
          this.props.question && <Spin spinning={this.state.loading} tip="上传中……">
            <div className={Style.question}>
              { question.stem && <Stem text={question.stem} /> }
              { userAnswer && <UserAnswer {...this.props} /> }
              <RevisedAnswer {...this.props} 
                  takeCamera={this.takeCamera}
                  receiveFailure={this.receiveFailure}
                  receiveSuccess={this.receiveSuccess}
                  />
              { question.options && <ResultAnswer {...this.props} /> }
              { question.videoAddress && <VideoAnalysis {...this.props} /> }
            </div>
          </Spin>
        }
      </Fragment>
    )
  }
}
export default Question;