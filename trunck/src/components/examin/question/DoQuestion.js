import React, { Fragment } from 'react';
import { Spin} from 'antd';
import { Stem , DoAnswer } from '../parts';
import Style from './index.less';

class DoQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loading:false
    };
  }
  componentDidMount=()=>{ 
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
    const { question } = this.props;
    return (
      <Fragment>
        { this.props.question && <Spin spinning={this.state.loading} tip="上传中……">
          <div className={Style.question}>
            { question && question.stem && <Stem text={question.stem} /> }
            <DoAnswer {...this.props} 
                  takeCamera={this.takeCamera}
                  receiveFailure={this.receiveFailure}
                  receiveSuccess={this.receiveSuccess}
                  />
          </div>
        </Spin>
      }
      </Fragment>
    )
  }
}
export default DoQuestion;