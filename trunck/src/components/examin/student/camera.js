import React from 'react'
import {takeCamera,registerCB} from '../../../utils/andriod';
import Styles from "./camera.less";
import {message} from 'antd';
import { connect } from 'dva';

class Camera extends React.Component{
    constructor(props){
        super(props);
    }
    
    receiveAndroidUrl(flag,id,url){
        if( flag ){
          message.success("上传成功");
          this.props.success(url); 
        }else{
          message.success("上传失败，请稍后重试");
          this.props.failure();     
        }
      }

    takeCamera=()=>{
        takeCamera(this.props.questionid);
        registerCB(this.props.questionid,this.receiveAndroidUrl.bind(this));
        this.props.takeCamera();
      }

    render(){
        const btnText = this.props.btnText || '拍照上传答案';
        return(<div onClick={this.takeCamera} className={Styles.photoBtn}>
            <i></i>
            <span>{btnText}</span>
          </div>)
    }
}

export default connect(({task})=>({task}))(Camera)